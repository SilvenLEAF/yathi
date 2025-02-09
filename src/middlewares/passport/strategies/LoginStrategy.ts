

import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import XDbHelpers from '../../../database';
import toolbox from '../../../utils/toolbox';
import { IRequestObject } from '../../../types';



export default new Strategy(
  {
    // overriding default username with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },



  async (req, email, password, done) => {
    const request = req as IRequestObject;
    const payload = request.body || {};

    const emailLower = toolbox.lowerAndTrim(email);
    const { User, Userinfo } = XDbHelpers.getDbModels();
    const existing = await User.findOne({ where: { email: emailLower }, raw: true, nest: true });
    if (!existing) {
      return done({ error: true, message: `No user found` }, false);
    }

    // if password does not match
    const isPasswordValid = bcrypt.compareSync(password, existing.password);
    if (!isPasswordValid) return done({ error: true, message: `Invalid Credentials` }, false);

    const existinguserinfo = await Userinfo.findOne({ where: { userId: existing.userId || 0 }, raw: true, nest: true });

    // if everything is OK, send the user onto the Cookie-fyer
    // (IN REACT) send the  (err, user, info) onto the passport middleware used on the auth route
    return done(undefined, existinguserinfo as any)
  }
)