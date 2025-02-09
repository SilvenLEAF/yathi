import { Request } from "express";
import XDbHelpers from "../database";
import { UserAttributes } from "../database/models/user";

export interface IRequestObject extends Request {
  user?: UserAttributes;

  getDbModels: typeof XDbHelpers.getDbModels;
  getSequelize: typeof XDbHelpers.getSequelize;
}
