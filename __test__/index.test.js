// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@jest/globals'; // импортируем джест
import { readFileSync } from 'fs'; // читаем файл
import path from 'path'; // модуль чтения путей
import { fileURLToPath } from 'url'; // функция декодирования элементов
import gendiff from '../src/index.js'; // функция для итогового поиска разницы

const __filename = fileURLToPath(import.meta.url); // поулчаем абсолюный путь до файла
const __dirname = path.dirname(__filename); // получаем название папки в которой находимся

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // метод джоин генирирует путь
test('file json', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultName = getFixturePath('file_result.txt');
  const result = readFileSync(resultName, 'utf8');
  expect(gendiff(filename1, filename2)).toBe(result);
});
