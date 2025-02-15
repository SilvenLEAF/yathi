import passport from 'passport';
import { IRequestObject } from '../types/common';
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate("local-jwt", { session: false }, (error: any, user: any, info: any) => {
    if (error) return res.status(400).json({ error: true, message: "Server error" });
    const request = req as IRequestObject;
    if (request.user) next(); // already logged in as per the cookie

    // if not attach user from jwt and make logged in
    if (user) request.user = user;
    // if they are NOT logged in, return with unauthorized message
    if (!request.user) return res.status(401).json({ error: true, message: `Please log in to access it` });

    next();
  })(req, res, next);

}