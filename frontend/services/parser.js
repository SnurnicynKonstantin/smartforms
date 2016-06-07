import Parser from 'morph-expressions';
import isNil from 'lodash/isNil';

const parser = new Parser();

parser.registerProperty('обязательное', scope => {
  const value = scope[scope.fieldName];

  return !isNil(value) && '' !== value;
});

parser.registerProperty('длина', scope => {
  const value = scope[scope.fieldName] || '';

  return value.length;
});

parser.registerProperty('русский', scope => /^[а-яё.\- ]{1,255}$/i.test(scope[scope.fieldName] || ''));

parser.registerProperty('адрес', scope => /^[0-9а-яё\s\.,\-;\/\(\)"]{1,255}$/i.test(scope[scope.fieldName] || ''));

parser.registerProperty('дом', scope => /^[0-9а-яa-zё\/]{1,7}$/i.test(scope[scope.fieldName] || ''));

export default parser;
