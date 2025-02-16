import passport from 'passport';
import XDbHelpers from '../../database';

// strategies
import LoginStrategy from './strategies/LoginStrategy';
import SignupStrategy from './strategies/SignupStrategy';
import JwtStrategy from './strategies/JwtStrategy';
import GoogleStrategy from './strategies/GoogleStrategy';
import TwitterStrategy from './strategies/TwitterStrategy';
import LinkedinStrategy from './strategies/LinkedinStrategy';
import FacebookStrategy from './strategies/FacebookStrategy';



/* ----------------------- serialize and de-serialize ----------------------- */
passport.serializeUser((user: any, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  const { Userinfo } = XDbHelpers.getDbModels();
  //  const user = await Userinfo.findOne({ where: { userId: userId || 0 }, raw: true, nest: true }).then(user => done(null, user));
  const user = await Userinfo.findOne({ where: { userId: userId || 0 }, raw: true, nest: true });
  done(null, user);
});



/* ------------------------------- strategies ------------------------------- */
passport.use('local-signup', SignupStrategy);
passport.use('local-login', LoginStrategy);
passport.use('local-jwt', JwtStrategy);

passport.use('google', GoogleStrategy);
passport.use('twitter', TwitterStrategy);
passport.use('linkedin', LinkedinStrategy);
passport.use('facebook', FacebookStrategy);
