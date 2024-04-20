// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export default (data, ext) => {
  switch (ext) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extention: ${ext}`);
  }
};
