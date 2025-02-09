import { Request, Response, NextFunction } from 'express'
import { IRequestObject } from '../types/common';
import moment from "moment";
import { QueryTypes } from 'sequelize';

export const upsertUserLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;
    const { userId, longitude, latitude } = request.body || {};
    if (!userId) {
      res.status(400).json({ error: true, message: "Please provide an userId" });
      return;
    }
    if (!longitude || !latitude) {
      res.status(400).json({ error: true, message: "Please provide a location" });
      return;
    }
    const { User, Userlocation } = request.getDbModels();
    const sequelize = request.getSequelize();

    const userRecord = await User.findOne({ where: { userId: userId || 0 }, raw: true, nest: true });
    if (!userRecord) {
      res.status(400).json({ error: true, message: "User not found" });
      return;
    }

    const whereClause = { userId: userId || 0 };
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
        userId: userId,
        createdBy: request.user?.userId,
      });
      locationRecord = locationRecord?.toJSON?.() || locationRecord || {}
      console.log("@location created", latitude, longitude);
    }

    res.json(locationRecord).status(200);
    return;
  } catch (error) {
    console.error("d", error);
    next({ error, req, res });
  }
}