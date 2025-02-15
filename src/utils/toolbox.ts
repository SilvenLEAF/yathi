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

const generateRandomPassword = (length: number) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';

  // Ensure the length is valid
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters.");
  }

  // Generate random password
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

const toolbox = {
  sleep,
  lowerAndTrim,
  generateWKT,
  camelizeKeys,
  getExportDirectory,
  generateRandomPassword,
}

export default toolbox;