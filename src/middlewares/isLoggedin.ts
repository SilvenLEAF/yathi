import { IRequestObject } from '../types/common';
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const request = req as IRequestObject;

  // if they are NOT logged in, return with unauthorized message
  if (!request.user) return res.status(401).json({ msg: `Please log in to access it` });

  // if they are logged in, give them access
  next();
}