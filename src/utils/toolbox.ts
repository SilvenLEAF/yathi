const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const lowerAndTrim = (text: string) => `${text || ""}`.trim().toLowerCase();

const toolbox = {
  sleep,
  lowerAndTrim,
}

export default toolbox;