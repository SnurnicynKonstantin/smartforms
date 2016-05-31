import template from './label.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Label extends Base {
  get templateFn() {
    return template;
  }
}

Factory.register('label', Label);
