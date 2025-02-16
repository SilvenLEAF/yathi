import path from "path";
import moment from "moment";
import FileType from "file-type";
import toolbox from "../../../utils/toolbox";
import SupabaseHelpers from "../../../utils/supabase";

export const getOauthPictureLocationFromUrl = async ({ pictureUrl, filename }: { pictureUrl?: string, filename?: string }) => {
  try {
    if (!pictureUrl) return;
    const fileBuffer = await toolbox.getBufferFromRemoteUrl({ url: pictureUrl });
    if (!fileBuffer) return;

    const filetype = await FileType.fromBuffer(fileBuffer);
    const extByFileType = filetype ? filetype.ext : '';

    const { pathname } = new URL(pictureUrl);
    let originalname = pathname.split("/").pop() || filename;
    if (!originalname) return;
    const pathResp = path.parse(originalname);
    const fileExt = pathResp.ext || `.${extByFileType}`;

    const fileNameWithTimeStamp = `${pathResp.name}_${moment().format('YYYYMMDDHHmmss')}${fileExt}`;
    const timeKey = moment().format('YYYY/MM/DD');
    const fileLocation = `${timeKey}/${fileNameWithTimeStamp}`;
    const uploadResp: any = await SupabaseHelpers.uploadFile({ fileLocation, fileBuffer });
    if (!uploadResp.id) return;

    return fileLocation;
  } catch (error) {
    console.error(error);
  }
}