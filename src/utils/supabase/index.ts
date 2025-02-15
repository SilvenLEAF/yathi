import config from "config";
import { createClient } from '@supabase/supabase-js';
const supabaseConfig: { apiKey: string, projectUrl: string, defaultStorageBucket: string } = config.get("supabase");

const SupabaseClient = createClient(supabaseConfig.projectUrl, supabaseConfig.apiKey);

const getSupabaseClient = async () => {
  try {
    return SupabaseClient;
  } catch (error) {
    console.error(error);
  }
}

const uploadFile = async ({ bucket, fileLocation, fileBuffer }: { bucket?: string, fileLocation: string, fileBuffer: Buffer }) => {
  try {
    bucket = bucket || supabaseConfig.defaultStorageBucket;
    const supabaseResp = await SupabaseClient.storage.from(bucket).upload(fileLocation, fileBuffer);
    if (supabaseResp.error) {
      console.error(supabaseResp.error);
      console.log("@@@@@@@@@@ Supabase Error on File Upload", supabaseResp.error.message);
      return { error: true, message: supabaseResp.error.message };
    }

    const supabaseData = supabaseResp.data || {}
    console.log("@@@@@@@@@@ Supabase Response on File Upload", supabaseData)

    return supabaseData;
  } catch (error: any) {
    console.error(error);
    console.log("@@@@@@@@@@ Supabase Error on File Upload", error.message);
    return { error: true, message: error.message };
  }
}

const deleteFiles = async ({ bucket, fileLocations }: { bucket: string, fileLocations: string[] }) => {
  try {
    bucket = bucket || supabaseConfig.defaultStorageBucket;
    const supabaseResp = await SupabaseClient.storage.from(bucket).remove(fileLocations);
    if (supabaseResp.error) {
      console.error(supabaseResp.error);
      console.log("@@@@@@@@@@ Supabase Error on File Delete", supabaseResp.error.message);
      return { error: true, message: supabaseResp.error.message };
    }

    const supabaseData = supabaseResp.data || {}
    console.log("@@@@@@@@@@ Supabase Response on File Delete", supabaseData)

    return supabaseData;
  } catch (error: any) {
    console.error(error);
    console.log("@@@@@@@@@@ Supabase Error on File Delete", error.message);
    return { error: true, message: error.message };
  }
}

const createSignedFileLink = async ({ bucket, fileLocation, expiresInSec }: { bucket?: string, fileLocation: string, expiresInSec?: number }) => {
  try {
    expiresInSec = expiresInSec || 15 * 60;
    bucket = bucket || supabaseConfig.defaultStorageBucket;

    const supabaseResp = await SupabaseClient.storage.from(bucket).createSignedUrl(fileLocation, expiresInSec);
    if (supabaseResp.error) {
      console.error(supabaseResp.error);
      console.log("@@@@@@@@@@ Supabase Error on Signed Link", supabaseResp.error.message);
      return null;
    }

    const supabaseData = supabaseResp.data || {}
    const fileLink = supabaseData.signedUrl;

    return fileLink;
  } catch (error: any) {
    console.error(error);
    console.log("@@@@@@@@@@ Supabase Error on Signed Link", error.message);
    return null;
  }
}

const SupabaseHelpers = {
  getSupabaseClient,
  uploadFile,
  deleteFiles,
  createSignedFileLink,
}

export default SupabaseHelpers;