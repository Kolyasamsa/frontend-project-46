
const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`unknown extension ${format}`);
  }
};

export default parse;
