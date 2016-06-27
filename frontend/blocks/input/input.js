import template from './input.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Input extends Base {

  render() {
    super.render();

    this._input = this.el.find('input');
    this._input.on('change', () => this.trigger('change'));
  }

  afterRender() {
    this._popoverEl = this.el.find(`#${this.id}`);
    this._errorEl = this.el.find('.controls');
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

  get errorEl() {
    return this._errorEl;
  }
}

Factory.register('input', Input);
