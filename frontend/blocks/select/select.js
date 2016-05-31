import 'jquery.formstyler';

import './select.scss';
import template from './select.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Select extends Base {
  get templateFn() {
    return template;
  }

  get value() {
    return {
      [this.config.name]: this._select.options[this._select.selectedIndex].value
    };
  }

  set value(val) {
    this._select.value = val;
    this._selectWrapper.trigger('refresh');
  }

  get name() {
    return this._select.options[this._select.selectedIndex].innerHTML;
  }

  render() {
    super.render();

    this._selectWrapper = this.el.find(`#${this.id}`);
    this._select = this._selectWrapper[0];
    this._selectWrapper.styler();

    if (this.config && this.config.value) {
      this.value = this.config.value;
    }
  }
}

Factory.register('select', Select);
