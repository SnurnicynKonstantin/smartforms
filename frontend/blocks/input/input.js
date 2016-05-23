import './input.scss';
import template from './input.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Input extends Base {
  get templateFn() {
    return template;
  }
}

Factory.register('input', Input);
