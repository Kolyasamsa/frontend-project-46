import { readFileSync } from 'fs';
import _ from 'lodash';
import * as path from 'path';
import parse from './parser.js';

const convertToString = (turnOverCombiArrays, arrayFile1, arrayFile2, file1, file2) => {
  let acc = '';
  (() => {
    // eslint-disable-next-line array-callback-return
    turnOverCombiArrays.map((key) => {
      if (arrayFile2.includes(key)) {
        if (_.isEqual(file2[key], file1[key])) {
          acc += `    ${key}: ${file1[key]}\n`;
        } else if (arrayFile2.includes(key) && !arrayFile1.includes(key)) {
          acc += `  + ${key}: ${file2[key]}\n`;
        } else {
          acc += `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
        }
      } else {
        acc += `  - ${key}: ${file1[key]}\n`;
      }
    });
  })();
  return (`{\n${acc}}`);
};

const getDeepEqual = (file1, file2) => {
  const arrayFile1 = Object.keys(file1);
  const arrayFile2 = Object.keys(file2);
  const combineArrays = _.union(arrayFile1, arrayFile2);
  const turnOverCombiArrays = _.sortBy(combineArrays);
  return convertToString(turnOverCombiArrays, arrayFile1, arrayFile2, file1, file2);
};

// eslint-disable-next-line import/prefer-default-export
export const getDiff = (filepath1, filepath2) => {
  const typeFile1 = path.extname(filepath1).slice(1);
  const typeFile2 = path.extname(filepath2).slice(1);

  const сurrentPath = process.cwd();
  const pathFile1 = path.resolve(сurrentPath, filepath1);
  const pathFile2 = path.resolve(сurrentPath, filepath2);
  const readFile1 = readFileSync(pathFile1, 'utf8');
  const readFile2 = readFileSync(pathFile2, 'utf8');

  const parsingFil1 = parse(readFile1, typeFile1);
  const parsingFil2 = parse(readFile2, typeFile2);
  return getDeepEqual(parsingFil1, parsingFil2);
};
