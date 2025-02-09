import passport from 'passport';
import { IRequestObject } from '../types/common';
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate("local-jwt", { session: false }, (error: any, user: any, info: any) => {
    if (error) return res.status(400).json({ error: true, message: "Server error" });
    const request = req as IRequestObject;
    request.user = user; // Attach user to request if passed jwt token

    // if they are NOT logged in, return with unauthorized message
    if (!request.user) return res.status(401).json({ error: true, message: `Please log in to access it` });

    next();
  })(req, res, next);

}