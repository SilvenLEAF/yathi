import fs from "fs";
import moment from "moment";
import { Request, Response, NextFunction } from 'express'
import { IRequestObject } from '../types/common';
import SupabaseHelpers from "../utils/supabase";



export const bulkFileUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;
    const luser = request.user!;

    const fileObject = request.files as { file: Express.Multer.File[] } | undefined;
    const fileItems = fileObject?.file;
    if (!Array.isArray(fileItems) || !fileItems.length) {
      res.status(400).json({ error: true, message: "Please provide at least one file" });
      return
    }

    const passed = [];
    const failed = [];
    for (let fileItem of fileItems) {
      const commonFileInfo = {
        originalname: fileItem.originalname,
        filename: fileItem.filename,
        mimetype: fileItem.mimetype,
        size: fileItem.size,
      }

      try {
        const fileBuffer = fs.readFileSync(fileItem.path);
        const timeKey = moment().format('YYYY/MM/DD');
        const fileLocation = `${timeKey}/${fileItem.filename}`;
        const uploadResp: any = await SupabaseHelpers.uploadFile({
          fileLocation,
          fileBuffer,
        })

        if (uploadResp.error) {
          failed.push({
            ...commonFileInfo,
            xErrorMessage: uploadResp.message,
          })
          continue;
        }

        const fileLink = await SupabaseHelpers.createSignedFileLink({ fileLocation })
        passed.push({
          ...commonFileInfo,
          fileId: uploadResp.id,
          fileLocation,
          fileLink,
        })
      } catch (error: any) {
        console.error(error);
        failed.push({
          ...commonFileInfo,
          xErrorMessage: error.message,
        })
      }
    }



    const finalResponse = { passed, failed };
    res.json(finalResponse).status(200);
    return;
  } catch (error) {
    next({ error, req, res });
  }
}

export const singleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req as IRequestObject;
    const luser = request.user!;

    const fileObject = request.files as { file: Express.Multer.File[] } | undefined;
    const fileItems = fileObject?.file;
    if (!Array.isArray(fileItems) || !fileItems.length) {
      res.status(400).json({ error: true, message: "Please provide a file" });
      return
    }
    if (fileItems.length > 1) {
      res.status(400).json({ error: true, message: "Please provide only one file" });
      return
    }
    const fileItem = fileItems[0];
    const commonFileInfo = {
      originalname: fileItem.originalname,
      filename: fileItem.filename,
      mimetype: fileItem.mimetype,
      size: fileItem.size,
    }

    const fileBuffer = fs.readFileSync(fileItem.path);
    const timeKey = moment().format('YYYY/MM/DD');
    const fileLocation = `${timeKey}/${fileItem.filename}`;
    const uploadResp: any = await SupabaseHelpers.uploadFile({
      fileLocation,
      fileBuffer,
    })

    if (uploadResp.error) {
      res.status(400).json({
        ...commonFileInfo,
        ...uploadResp,
      });
      return;
    }

    const fileLink = await SupabaseHelpers.createSignedFileLink({ fileLocation })
    const finalResponse = { ...commonFileInfo, fileId: uploadResp.id, fileLink }
    res.json(finalResponse).status(200);
    return;
  } catch (error) {
    next({ error, req, res });
  }
}