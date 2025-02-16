import moment from "moment";
import { Request, Response, NextFunction } from 'express'
import { IRequestObject } from '../types/common';
import SupabaseHelpers from "../utils/supabase";

export const getLoggedInUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;
    const luser: any = request.user;

    if (!request.user) {
      res.status(200).json({ user: null });
      return;
    }

    if (luser.picture) {
      luser.pictureLink = await SupabaseHelpers.createSignedFileLink({ fileLocation: luser.picture });
    }

    res.status(200).json({ user: luser });
    return;
  } catch (error) {
    next({ error, req, res });
  }
}

export const updateOwnProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;
    const luser = request.user!;

    const payload = request.body || {};
    const { Userinfo } = request.getDbModels();

    const whereClause = { userId: luser.userId || 0 };
    const existing = await Userinfo.findOne({ where: whereClause, raw: true, nest: true });
    if (!existing) {
      res.status(404).json({ error: true, message: "Profile not found" });
      return
    }

    await Userinfo.update({
      firstname: payload.firstname,
      lastname: payload.lastname,
      picture: payload.picture,
      age: payload.age,
      gender: payload.gender,
      occupation: payload.occupation,
      zodiac: payload.zodiac,
      updatedBy: luser.userId,
      updatedAt: moment(),
    }, { where: whereClause });

    res.json({ message: "Updated successfully" }).status(200);
    return;
  } catch (error) {
    next({ error, req, res });
  }
}