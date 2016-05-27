import template from './input.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Input extends Base {
  get templateFn() {
    return template;
  }

  get value() {
    return {
      [this.config.name]: this.el.find('input').val()
    };
  }
}

Factory.register('input', Input);
