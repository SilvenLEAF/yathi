import config from "config";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { NextFunction, Request, Response, Router } from 'express'



const router = Router();
/* -------------------------------- route(s) -------------------------------- */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google'),
  (req: Request, res: Response) => {
    res.redirect('/')
  }
)

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback',
  passport.authenticate('twitter'),
  (req: Request, res: Response) => {
    res.redirect('/');
  }
)

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook'),
  (req: Request, res: Response) => {
    res.redirect('/');
  }
)

router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));
router.get('/linkedin/callback',
  passport.authenticate('linkedin'),
  (req: Request, res: Response) => {
    res.redirect('/');
  }
)

export default router;