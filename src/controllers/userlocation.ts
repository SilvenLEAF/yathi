import { Request, Response, NextFunction } from 'express'
import { IRequestObject } from '../types/common';
import moment from "moment";
import { QueryTypes } from 'sequelize';

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