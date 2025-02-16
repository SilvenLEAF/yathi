import { Request } from "express";
import XDbHelpers from "../database";
import { UserinfoAttributes } from "../database/models/userinfo";

export interface IRequestObject extends Request {
  user?: UserinfoAttributes;

  getDbModels: typeof XDbHelpers.getDbModels;
  getSequelize: typeof XDbHelpers.getSequelize;
}
