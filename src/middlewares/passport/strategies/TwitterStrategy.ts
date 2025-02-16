import config from "config";
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-twitter';
import XDbHelpers from "../../../database";
import toolbox from "../../../utils/toolbox";
import { getOauthPictureLocationFromUrl } from "../helpers";

const oauthConfig: any = config.get("oauth");
const twitterConfig: {
  TWITTER_CONSUMER_KEY: string;
  TWITTER_CONSUMER_SECRET: string;
  TWITTER_CALLBACK_URL: string;
} = oauthConfig.twitter;

export default new Strategy(
  {
    consumerKey: twitterConfig.TWITTER_CONSUMER_KEY!,
    consumerSecret: twitterConfig.TWITTER_CONSUMER_SECRET!,
    callbackURL: twitterConfig.TWITTER_CALLBACK_URL,
    passReqToCallback: true,
  },

  async (req, accessToken, refreshToken, profile, done) => {
    console.log("@twitter profile", profile);
    const { User, Userinfo } = XDbHelpers.getDbModels();

    const genEmail = (text: string) => toolbox.lowerAndTrim(text) + "@yathi.ai";
    const oauthInfo = {
      twitterOauthId: profile.id,
      twitterHandle: profile.username ? `@${profile.username}` : undefined,

      username: profile.displayName,
      profileImage: profile.photos?.[0].value,
      email: toolbox.lowerAndTrim(profile?.emails?.[0].value) || genEmail(profile.username),
    }
    const emailLower = toolbox.lowerAndTrim(oauthInfo.email);
    let pictureLocation = await getOauthPictureLocationFromUrl({ pictureUrl: oauthInfo.profileImage });

    let existing = await User.findOne({ where: { twitterOauthId: oauthInfo.twitterOauthId || 0 }, raw: true, nest: true });
    // users can not create 2 accouts with oauthId and email
    if (!existing) {
      existing = await User.findOne({ where: { email: oauthInfo.email || 0 }, raw: true, nest: true });
      if (existing) {
        await User.update({ twitterOauthId: oauthInfo.twitterOauthId }, { where: { userId: existing.userId || 0 } });
      }
    }

    if (existing) {
      // log in
      const exuserinfo = await Userinfo.findOne({ where: { userId: existing.userId || 0 }, raw: true, nest: true });
      if (!exuserinfo?.picture) {
        await Userinfo.update({ picture: pictureLocation }, { where: { userId: existing.userId || 0 } });
      }
      done(undefined, existing);
    } else {
      // sign up
      const password = toolbox.generateRandomPassword(8);

      let newuser = await User.create({
        email: emailLower,
        username: emailLower,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        twitterOauthId: oauthInfo.twitterOauthId,
      });

      let newuserinfo = await Userinfo.create({
        email: emailLower,
        userId: newuser.userId,
        firstname: oauthInfo.username,
        picture: pictureLocation,
        twitterHandle: oauthInfo.twitterHandle,

        createdBy: newuser.userId,
        updatedBy: newuser.userId,
      });

      newuserinfo = newuserinfo && newuserinfo.toJSON && newuserinfo.toJSON() || newuserinfo || {};
      done(null, newuserinfo); // Send it onto the Cookie-fyer. (IN REACT) send the  (err, user, info) onto the passport middleware used on the auth route
    }
  }
)