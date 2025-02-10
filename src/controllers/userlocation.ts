import { Request, Response, NextFunction } from 'express'
import { IRequestObject } from '../types/common';
import moment from "moment";
import { QueryTypes } from 'sequelize';
import toolbox from '../utils/toolbox';

export const upsertUserLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;
    const luser = request.user!;
    const { longitude, latitude } = request.body || {};

    if (!longitude || !latitude) {
      res.status(400).json({ error: true, message: "Please provide a location" });
      return;
    }
    const { User, Userlocation } = request.getDbModels();
    const whereClause = { userId: luser.userId || 0 };

    const userRecord = await User.findOne({ where: whereClause, raw: true, nest: true });
    if (!userRecord) {
      res.status(400).json({ error: true, message: "User not found" });
      return;
    }

    const existing = await Userlocation.findOne({ where: whereClause, raw: true, nest: true });
    let locationRecord;
    const upsertObject = {
      latitude, longitude,
      locationGeography: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    }
    if (existing) {
      await Userlocation.update({
        ...upsertObject,
        updatedAt: moment(),
      }, { where: whereClause })
      locationRecord = await Userlocation.findOne({ where: whereClause, raw: true, nest: true });
      console.log("@location updated", latitude, longitude);
    } else {
      locationRecord = await Userlocation.create({
        ...upsertObject,
        userId: luser.userId,
        createdBy: luser.userId,
      });
      locationRecord = locationRecord?.toJSON?.() || locationRecord || {}
      console.log("@location created", latitude, longitude);
    }

    res.json(locationRecord).status(200);
    return;
  } catch (error) {
    console.error("@Error occured while processing", error);
    next({ error, req, res });
  }
}

export const getMatchesBasedOnLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;
    const luser = request.user!;
    const { radiusInMeter, limit, skip, longitude, latitude } = request.body || {};

    if (!radiusInMeter) {
      res.status(400).json({ error: true, message: "Please provide a radiusInMeter" });
      return;
    }
    const { User, Userlocation } = request.getDbModels();
    const sequelize = request.getSequelize();

    const luserLocation = await Userlocation.findOne({ where: { userId: luser.userId || 0 }, raw: true, nest: true });
    if (!luserLocation) {
      res.status(400).json({ error: true, message: "You did not share your location yet" });
      return;
    }

    function getSqlStmt(queryType?: string) {
      const isCount = toolbox.lowerAndTrim(queryType) === "count";
      let sqlStmt = isCount ? `SELECT COUNT(*)` : `
        SELECT  
          ui.user_id, ui.email, ui.firstname, ui.lastname, ui.gender,
          ST_Y(uloc.location_geography::geometry) AS latitude,  -- Convert GEOGRAPHY to GEOMETRY before extracting
          ST_X(uloc.location_geography::geometry) AS longitude,
          ST_Distance(
              uloc.location_geography, 
              ST_GeogFromText(:userGeoLocation)
          ) AS distance_in_meters  -- Calculate distance in meters
      `;

      // (SELECT luiloc.location_geography FROM yathi.userlocation luiloc WHERE luiloc .user_id = 1), -- user's current location
      sqlStmt += `  
      FROM
        yathi.userinfo ui
        INNER JOIN yathi.userlocation uloc ON uloc.user_id = ui.user_id
      WHERE ST_DWithin(
          uloc.location_geography, 
          ST_GeogFromText(:userGeoLocation),
          :radiusInMeter  -- radius in meters
        )
        AND ui.user_id <> :luserId
      `
      if (!isCount) {
        sqlStmt += ` ORDER BY ui.email ASC`;
        if (limit) sqlStmt += ` LIMIT :limit`;
        if (skip) sqlStmt += ` OFFSET :skip`;
      }
      return sqlStmt;
    }

    console.log(getSqlStmt());
    const replacements = {
      luserId: luser.userId,
      radiusInMeter: radiusInMeter,

      userGeoLocation: toolbox.generateWKT({
        latitude: luserLocation.latitude,
        longitude: luserLocation.longitude
      }),
    };
    const sequelizeOptions = { type: QueryTypes.SELECT, replacements };
    console.log(replacements);
    const rawrecords = await sequelize.query(getSqlStmt(), sequelizeOptions);
    const rawcount: any = await sequelize.query(getSqlStmt('count'), sequelizeOptions);
    const records = toolbox.camelizeKeys(rawrecords);

    const finalResponse = {
      limit, skip,
      count: rawcount[0]?.count,
      radiusInMeter, records,

    }
    res.json(finalResponse).status(200);
    return;
  } catch (error) {
    console.error("@Error occured while processing", error);
    next({ error, req, res });
  }
}