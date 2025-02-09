const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const toolbox = {
  sleep,
}

export default toolbox;