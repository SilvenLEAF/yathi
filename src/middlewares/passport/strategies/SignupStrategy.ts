import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import XDbHelpers from '../../../database';
import toolbox from '../../../utils/toolbox';
import { IRequestObject } from '../../../types';


export default new Strategy(
  {
    // overriding the default username with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },

  async (req, email, password, done) => {
    const request = req as IRequestObject;
    const payload = request.body;

    const { User, Userinfo } = XDbHelpers.getDbModels();
    const emailLower = toolbox.lowerAndTrim(email);

    const existing = await User.findOne({ where: { email: emailLower }, raw: true, nest: true });
    if (existing) {
      return done({ error: true, message: `This email is already taken` }, false);
    }

    // if not, create a new account
    let newuser = await User.create({
      email: emailLower,
      username: emailLower,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
    });

    let newuserinfo = await Userinfo.create({
      email: emailLower,
      userId: newuser.userId,
      firstname: payload.firstname,
      lastname: payload.lastname,
      picture: payload.picture,
      age: payload.age,
      gender: payload.gender,
      occupation: payload.occupation,
      zodiac: payload.zodiac,

      createdBy: newuser.userId,
      updatedBy: newuser.userId,
    });

    newuserinfo = newuserinfo && newuserinfo.toJSON && newuserinfo.toJSON() || newuserinfo || {};
    done(null, newuserinfo); // Send it onto the Cookie-fyer. (IN REACT) send the  (err, user, info) onto the passport middleware used on the auth route
  }

)