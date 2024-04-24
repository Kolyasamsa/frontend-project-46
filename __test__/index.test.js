import path from 'path';
import fs from 'fs';
import url from 'url';
import { expect, describe, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('testing function genDiff plain formatter', () => {
  test('json files compare', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = getFixturePath('result_PLAIN.txt');
    expect(genDiff(file1, file2, 'plain')).toBe(
      fs.readFileSync(expected, 'utf-8'),
    );
  });

  test('yaml files compare', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expected = getFixturePath('result_PLAIN.txt');
    expect(genDiff(file1, file2, 'plain')).toBe(
      fs.readFileSync(expected, 'utf-8'),
    );
  });
});

describe('testing function genDiff json formatter', () => {
  test('json files compare', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = getFixturePath('result_JSON.txt');
    expect(genDiff(file1, file2, 'json')).toBe(
      fs.readFileSync(expected, 'utf-8'),
    );
  });

  test('yaml files compare', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expected = getFixturePath('result_JSON.txt');
    expect(genDiff(file1, file2, 'json')).toBe(
      fs.readFileSync(expected, 'utf-8'),
    );
  });
});
