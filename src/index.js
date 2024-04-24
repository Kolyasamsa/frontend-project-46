import { readFileSync } from 'fs';
import path from 'path';
import parser from './parser.js';
import getDifferenceTree from './getDifference.js';
import formatter from './formatter/index.js';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return readFileSync(fullPath, 'utf8');
};

const getFileFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = parser(getData(file1), getFileFormat(file1));
  const data2 = parser(getData(file2), getFileFormat(file1));
  const tree = getDifferenceTree(data1, data2);

  return formatter(tree, formatName);
};

export default genDiff;
