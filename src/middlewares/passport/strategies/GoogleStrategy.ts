import config from "config";
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-google-oauth20';
import XDbHelpers from "../../../database";
import toolbox from "../../../utils/toolbox";

const oauthConfig: any = config.get("oauth");
const googleConfig: {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
} = oauthConfig.google;




export default new Strategy(
  {
    clientID: googleConfig.GOOGLE_CLIENT_ID!,
    clientSecret: googleConfig.GOOGLE_CLIENT_SECRET!,
    callbackURL: googleConfig.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  },

  async (req, accessToken, refreshToken, profile, done) => {
    console.log("@google profile", profile);
    const { User, Userinfo } = XDbHelpers.getDbModels();

    const googleProfileInfo = {
      googleOauthId: profile.id,
      username: profile.displayName,
      profileImage: profile.photos?.[0].value,
      email: toolbox.lowerAndTrim(profile?.emails?.[0].value),
    }
    const emailLower = toolbox.lowerAndTrim(googleProfileInfo.email);
    let existing = await User.findOne({ where: { googleOauthId: googleProfileInfo.googleOauthId || 0 }, raw: true, nest: true });

    if (!existing) {
      // users can not create 2 accouts with google and email
      // check if email account exists

      existing = await User.findOne({ where: { email: googleProfileInfo.email || 0 }, raw: true, nest: true });
      if (existing) {
        await User.update({ googleOauthId: googleProfileInfo.googleOauthId }, { where: { userId: existing.userId || 0 } });
      }
    }

    if (existing) {
      // log in
      done(undefined, existing);
    } else {
      // sign up
      const password = toolbox.generateRandomPassword(8);

      let newuser = await User.create({
        email: emailLower,
        username: emailLower,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        googleOauthId: googleProfileInfo.googleOauthId,
      });

      let newuserinfo = await Userinfo.create({
        email: emailLower,
        userId: newuser.userId,
        firstname: googleProfileInfo.username,
        picture: googleProfileInfo.profileImage,

        createdBy: newuser.userId,
        updatedBy: newuser.userId,
      });

      newuserinfo = newuserinfo && newuserinfo.toJSON && newuserinfo.toJSON() || newuserinfo || {};
      done(null, newuserinfo); // Send it onto the Cookie-fyer. (IN REACT) send the  (err, user, info) onto the passport middleware used on the auth route
    }
  }
)