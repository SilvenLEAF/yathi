import mkdirp from "mkdirp";
import { camelCase } from "lodash";

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const lowerAndTrim = (text?: string) => `${text || ""}`.trim().toLowerCase();

const generateWKT = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
  return `SRID=4326;POINT(${longitude} ${latitude})`;
}

const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

const getExportDirectory = (key?: string) => {
  const env = lowerAndTrim(process.env.NODE_ENV);
  const isProduction = ['production'].includes(env);
  const devBaseFol = `./logs`;

  try {
    let baseFols = isProduction ? ['/tmp'] : [devBaseFol];
    if (key) baseFols.push(key);

    let exportDir = baseFols.filter(Boolean).join('/');
    console.log('@export directory', exportDir);
    mkdirp.sync(exportDir);

    return exportDir;
  } catch (error: any) {
    console.error(error.message)
    console.error(error)

    return isProduction ? '/tmp' : devBaseFol;
  }
}

const toolbox = {
  sleep,
  lowerAndTrim,
  generateWKT,
  camelizeKeys,
  getExportDirectory,
}

export default toolbox;