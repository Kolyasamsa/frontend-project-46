import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import parser from './parser.js';
import getDifferenceTree from './getDifference.js';
import formatter from './formatter/index.js';

const getPath = (filepath) => path.resolve(cwd(), filepath);
const getFileFormat = (filename) => path.extname(filename).slice(1);
const readFile = (filepath) => readFileSync(getPath(filepath), 'utf-8');

const genDiff = (file1, file2, formatName = 'stylish') => {
  const content1 = readFile(file1);
  const content2 = readFile(file2);
  const data1 = parser(content1, getFileFormat(file1));
  const data2 = parser(content2, getFileFormat(file2));
  const tree = getDifferenceTree(data1, data2);

  return formatter(tree, formatName);
};

export default genDiff;
