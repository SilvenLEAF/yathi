import config from "config";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { NextFunction, Request, Response, Router } from 'express'



const router = Router();
/* -------------------------------- route(s) -------------------------------- */
router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logOut((error) => {
    if (error) {
      next({ error, req, res })
    }
    res.json({ msg: `Logged out` });
  });
});

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local-signup', (error: any, user: any, info: any) => {
    // if there is any error (including the error I defined on the Strategy)
    if (error) return res.status(400).json(error);

    req.logIn(user, (loginError) => {
      // if there is an error while logging in
      if (loginError) return res.status(400).json({ error: true, message: info?.message || `Oops, something went wrong` });

      // if everything is OK, return the user onto the Cookie-fyer
      return res.json(user);
    })

  })(req, res, next);
})

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local-login', (error: any, user: any, info: any) => {
    // if there is any error (including the error I defined on the Strategy)
    if (error) return res.status(400).json(error);

    req.logIn(user, (loginError) => {
      //  if there is an error while logging in
      if (loginError) return res.status(400).json({ error: true, message: info?.message || `Oops, something went wrong` });
      const token = jwt.sign({ id: user.userId }, config.get("jwtSecret") || "jwtsecret", { expiresIn: "1h" });

      // if everything is OK, send the user onto the Cookie-fyer
      return res.json({ token, user });
    })
  })(req, res, next);
})

export default router;