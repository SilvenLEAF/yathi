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

const toolbox = {
  sleep,
  lowerAndTrim,
  generateWKT,
  camelizeKeys,
}

export default toolbox;