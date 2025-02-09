import { Request } from "express";
import XDbHelpers from "../database";

export interface IRequestObject extends Request {
  user?: any;

  getDbModels: typeof XDbHelpers.getDbModels;
  getSequelize: typeof XDbHelpers.getSequelize;
}
