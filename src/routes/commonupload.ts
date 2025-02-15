import { NextFunction, Response, Router } from 'express';
import * as CommonUploadController from '../controllers/commonupload';

/* ------------------------------ middleware(s) ----------------------------- */
import isLoggedin from '../middlewares/isLoggedin';
import MulterHelpers from '../middlewares/multer';
/* -------------------------------------------------------------------------- */

const router = Router();
const fileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return MulterHelpers.multerHigherOrderMiddleware({
    fileFieldConfigs: [
      { fileKey: "file", maxFileCount: 100 },
    ]
  })(req, res, next);
};
/* ---------------------------- register route(s) --------------------------- */

router.post('/bulk', isLoggedin as any, fileMiddleware as any, CommonUploadController.bulkFileUpload);
router.post('/single', isLoggedin as any, fileMiddleware as any, CommonUploadController.singleFileUpload);
/* -------------------------------------------------------------------------- */
export default router;