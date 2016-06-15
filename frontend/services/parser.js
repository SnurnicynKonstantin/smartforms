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

parser.registerProperty('значение', scope => scope[scope.fieldName] || '');

parser.registerProperty('русский', scope => /^[а-яё.\- ]{1,255}$/i.test(scope[scope.fieldName] || ''));

parser.registerProperty('адрес', scope => {
  return /^[0-9а-яё\s\.,\-;\/\(\)"]{1,255}$/i.test(scope[scope.fieldName] || '')
    ? scope[scope.fieldName]
    : false;
});

parser.registerProperty('дом', scope => {
  return /^[0-9а-яa-zё\/]{1,7}$/i.test(scope[scope.fieldName] || '')
    ? scope[scope.fieldName]
    : false;
});

parser.registerProperty('email', scope => {
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(scope[scope.fieldName] || '')
    ? scope[scope.fieldName]
    : false;
});

parser.registerProperty('password', scope => {
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{6,16}$/i.test(scope[scope.fieldName] || '')
    ? scope[scope.fieldName]
    : false;
});

export default parser;
