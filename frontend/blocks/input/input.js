import template from './input.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Input extends Base {

  afterRender() {
    this._popoverEl = this.el.find('input');
    super.afterRender();
  }

  get templateFn() {
    return template;
  }

  get popoverEl() {
    return this._popoverEl;
  }

  get value() {
    return {
      [this.config.name]: this.el.find('input').val()
    };
  }

  set value(val) {
    this.el.find('input').val(val);
  }
}

Factory.register('input', Input);
