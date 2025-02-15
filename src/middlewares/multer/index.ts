import path from "path";
import multer from "multer";
import { NextFunction, Response } from "express";
import toolbox from "../../utils/toolbox";

const DefaultAllowedFileExtensions = [
  '.docx', '.odt', '.pdf', '.doc',
  '.jpg', '.jpeg', '.png', '.txt', '.cfb',
  '.csv', '.xls', '.xlsx', '.ppt', '.pptx',
  '.rtf', '.json', '.mp4', '.mp3', '.zip',
];

export interface IAttachFileOptions {
  fileKey?: string;
  maxFileCount?: number;
  maxFileSizeInMb?: number;
  allowedFileExtensions?: string[];
  fileFieldConfigs: { fileKey: string, maxFileCount: number }[];
}

interface IProps extends IAttachFileOptions {
  req: Request;
  res: Response;

  fileKey?: string;
  maxFileCount?: number;
  maxFileSizeInMb?: number;
  allowedFileExtensions?: string[];
  fileFieldConfigs: { fileKey: string, maxFileCount: number }[];
}

const attachFilesToRequest = async ({ req, res, maxFileSizeInMb, maxFileCount, allowedFileExtensions, fileFieldConfigs }: IProps) => {
  try {
    const checkForExtensions = allowedFileExtensions || DefaultAllowedFileExtensions;
    maxFileSizeInMb = maxFileSizeInMb || 10;
    maxFileCount = maxFileCount || 10;

    const fieldConfigs = fileFieldConfigs.map(elm => ({ name: elm.fileKey, maxCount: elm.maxFileCount }));
    const saveToLocalStorage = multer({
      storage: localStorage,
      limits: {
        fields: 100,
        files: maxFileCount,
        fileSize: maxFileSizeInMb * 1024 * 1024, // (in bytes)
      },
      fileFilter: (req, file, cb) => {
        let isValid = isValidFile({ file, allowedFileExtensions: checkForExtensions })
        cb(null, isValid);
      }
    }).fields(fieldConfigs);

    let multerResp = new Promise(async (resolve, reject) => {
      saveToLocalStorage(req as any, res, async (error) => {
        if (error) {
          console.error('Error uploading file:', error);  //
          reject(error);
        }
        resolve("Successfully attached files to request");
      });
    }).then(resp => resp).catch(error => error);

    return multerResp;
  } catch (error: any) {
    console.log(error);
    return { error: true, message: error.message };
  }
};

const multerHigherOrderMiddleware = ({ fileFieldConfigs }: IAttachFileOptions) => {
  fileFieldConfigs = fileFieldConfigs.length ? fileFieldConfigs : [{ fileKey: "file", maxFileCount: 100 }];

  return async (req: Request, res: Response, next: NextFunction) => {
    const attachResp: any = await attachFilesToRequest({ req, res, fileFieldConfigs }) || {};

    if (attachResp.error) {
      return res.status(400).json(attachResp);
    }

    next();
  }
}

/* --------------------------- helper function(s) --------------------------- */
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const xfol = toolbox.getExportDirectory();
    cb(null, xfol)
  },
  filename: function (req, file, cb) {
    let fExt = file.originalname && path.extname(file.originalname) || null;
    let fileName = file.fieldname + '-' + Date.now() + fExt; // to ensure file sharing same name should not over-write each other
    cb(null, fileName)
  }
})

const isValidFile = ({ file, allowedFileExtensions }: { file: any, allowedFileExtensions: string[] }) => {
  if (!Array.isArray(allowedFileExtensions) || !allowedFileExtensions.length) return true;
  const { originalname = "" } = file || {};

  const extension = path.extname(originalname);
  if (allowedFileExtensions.includes(extension.toLowerCase())) {
    return true;
  } else {
    return false;
  }
};
/* -------------------------------------------------------------------------- */

const MulterHelpers = {
  attachFilesToRequest,
  multerHigherOrderMiddleware,
}

export default MulterHelpers;