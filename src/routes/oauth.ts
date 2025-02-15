import config from "config";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { NextFunction, Request, Response, Router } from 'express'



const router = Router();
/* -------------------------------- route(s) -------------------------------- */
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google'),
  (req: Request, res: Response) => {
    res.redirect('/')
  }
)

export default router;