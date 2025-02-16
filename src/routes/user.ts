import { Router } from 'express';
import { IRequestObject } from '../types/common';
import * as UserController from '../controllers/user';
import * as UserLocationController from '../controllers/userlocation';

/* ------------------------------ middleware(s) ----------------------------- */
import isLoggedin from '../middlewares/isLoggedin';
/* -------------------------------------------------------------------------- */

const router = Router();
/* ---------------------------- register route(s) --------------------------- */
router.get('/', isLoggedin as any, UserController.getLoggedInUserInfo);
router.patch('/profile', isLoggedin as any, UserController.updateOwnProfile);
router.post('/matches', isLoggedin as any, UserLocationController.getMatchesBasedOnLocation);
/* -------------------------------------------------------------------------- */
export default router;