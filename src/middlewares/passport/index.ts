import passport from 'passport';
import XDbHelpers from '../../database';

// strategies
import LoginStrategy from './strategies/LoginStrategy';
import SignupStrategy from './strategies/SignupStrategy';
import JwtStrategy from './strategies/JwtStrategy';



/* ----------------------- serialize and de-serialize ----------------------- */
passport.serializeUser((user: any, done) => {
  done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
  const { Userinfo } = XDbHelpers.getDbModels();
  Userinfo.findOne({ where: { userId: userId || 0 } }).then(user => done(null, user));
});



/* ------------------------------- strategies ------------------------------- */
passport.use('local-signup', SignupStrategy);
passport.use('local-login', LoginStrategy);
passport.use('local-jwt', JwtStrategy);