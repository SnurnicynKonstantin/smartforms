import template from './static.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Static extends Base {
  get templateFn() {
    return template;
  }

  get value() {
    const value = {};

    value[this.config.name] = this.el.find('span.form-control-static')[0].innerHTML;

    return value;
  }

  set value(val) {
    this.el.find('span.form-control-static')[0].innerHTML = val;
  }
}

Factory.register('static', Static);
