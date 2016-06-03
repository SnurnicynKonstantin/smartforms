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

export default parser;
