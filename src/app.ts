import path from 'path'
import config from "config";
import XDbHelpers from "./database";
import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `client/build`)));

// attach db helper(s) in request
app.use((req: any, res: Response, next: NextFunction) => {
  req.getDbModels = XDbHelpers.getDbModels;
  req.getSequelize = XDbHelpers.getSequelize;
  next();
});

// register all the route(s) here
import UserRoutes from "./routes/user";
app.use('/user', UserRoutes);

import UserLocationRoutes from "./routes/userlocation";
app.use('/userlocation', UserLocationRoutes);

// check server status
app.get('/hello', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Glad to have you drop by : )" })
})

// catch-all handler
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Nothing here : )" })
})

// catch-all error handler
app.use((errorObjectWithRequestAndResponse: { error: any, req: Request, res: Response }) => {
  const { error, req, res } = errorObjectWithRequestAndResponse;

  console.error(error);
  console.error(error.message);

  res.status(400).json({ msg: 'Server Error!', error: error.message });
})

// -----------------------------------------LISTEN
const PORT = config.get("PORT") || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})