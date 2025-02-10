import path from 'path'
import http from 'http';
import config from "config";
import XDbHelpers from "./database";
import initializeSocketIO from './middlewares/socketio';
import express, { Request, Response, NextFunction } from 'express';

import passport from "passport";
// import cookieSession from 'express-session';
import expressSession from 'express-session';


const app = express();
const server = http.createServer(app);
initializeSocketIO(server); // initialize socket-io for this serve for real time chatting

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `../client`)));

// attach db helper(s) in request
app.use((req: any, res: Response, next: NextFunction) => {
  req.getDbModels = XDbHelpers.getDbModels;
  req.getSequelize = XDbHelpers.getSequelize;
  next();
});

// Session for Passport Local Strategy (not needed for JWT)
app.use(expressSession({
  secret: config.get("cookieSessionKey"),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());
import "./middlewares/passport";


// register all the route(s) here
import AuthRoutes from "./routes/auth";
app.use('/auth', AuthRoutes);

import UserRoutes from "./routes/user";
app.use('/user', UserRoutes);

import UserLocationRoutes from "./routes/userlocation";
app.use('/userlocation', UserLocationRoutes);

// open YathiRoom
app.get('/ui/yathiroom', (req: Request, res: Response, next: NextFunction) => {
  console.log("@requested for YathiRoom");
  res.status(200).sendFile(path.resolve(__dirname, '../client/YathiRoom.html'));
})

// check server status
app.get('/hello', (req: Request, res: Response, next: NextFunction) => {

  res.status(200).json({ message: "Glad to have you drop by : )" })
})

// catch-all handler
// app.use('*', (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json({ message: "Nothing here : )" });
// })

// catch-all error handler
app.use((errorObjectWithRequestAndResponse: { error: any, req: Request, res: Response, next: NextFunction }) => {
  const { error, req, res, next } = errorObjectWithRequestAndResponse;
  if (error) {

    console.error(error);
    console.error(error?.message);

    res.status(400).json({ error: true, message: error?.message || 'Server Error!' });
  }
  next()
})

// -----------------------------------------LISTEN
const PORT = config.get("PORT") || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})