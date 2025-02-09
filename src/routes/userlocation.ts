import { Router } from 'express';
import { IRequestObject } from '../types/common';
import * as UserLocationController from '../controllers/userlocation';

/* ------------------------------ middleware(s) ----------------------------- */
import isLoggedin from '../middlewares/isLoggedin';
/* -------------------------------------------------------------------------- */

const router = Router();
/* ---------------------------- register route(s) --------------------------- */
router.get('/', isLoggedin as any, (req, res, next) => {
  const request = req as IRequestObject;
  res.status(200).json({ user: request.user });
});

router.patch('/update', isLoggedin as any, UserLocationController.upsertUserLocation);
/* -------------------------------------------------------------------------- */
export default router;