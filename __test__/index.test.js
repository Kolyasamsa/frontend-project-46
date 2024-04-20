import path from 'path';
import fs from 'fs';
import url from 'url';
import { expect, describe, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileJSON1 = getFixturePath('file1.json');
const fileJSON2 = getFixturePath('file2.json');

const fileYML1 = getFixturePath('file1.yml');
const fileYML2 = getFixturePath('file2.yml');

const result = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const resultStylish = result('result_STYLIH.txt');
const resultPlain = result('result_PLAIN.txt');
const resultJson = result('result_JSON.txt');

describe.each([
  {
    formatName: 'stylish',
    expected: resultStylish,
  },
  {
    formatName: 'plain',
    expected: resultPlain,
  },
  {
    formatName: 'json',
    expected: resultJson,
  },
])('format tests', ({ formatName, expected }) => {
  test.each([
    {
      formatName,
      file1: fileJSON1,
      file2: fileJSON2,
    },
    {
      formatName,
      file1: fileYML1,
      file2: fileYML2,
    },
  ])(`diff test for ${formatName} format`, ({ file1, file2 }) => {
    expect(genDiff(file1, file2, formatName)).toBe(expected);
  });
});
