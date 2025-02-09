import { Request, Response, NextFunction } from 'express'
import { IRequestObject } from '../types/common';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;

    const { User } = request.getDbModels();
    const users = await User.findAll({ where: {}, raw: true, nest: true });

    res.json({ users: users }).status(200);
  } catch (error) {
    next({ error, req, res });
  }
}