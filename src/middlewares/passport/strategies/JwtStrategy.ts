

import config from 'config';
const { Strategy, ExtractJwt } = require("passport-jwt");
import XDbHelpers from '../../../database';



const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get("jwtSecret") || "jwtsecret",
};

export default new Strategy(jwtOptions, async (jwtPayload: any, done: any) => {
  try {
    const { Userinfo } = XDbHelpers.getDbModels();
    const user = await Userinfo.findOne({ where: { userId: jwtPayload.id || 0 }, raw: true, nest: true });
    if (!user) return done(null, false);

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
})