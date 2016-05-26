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
    const value = {};

    value[this.config.name] = this._select.options[this._select.selectedIndex].value;

    return value;
  }

  set value(val) {
    this._select.value = val;
    this._selectWrapper.trigger('refresh');
  }

  render() {
    super.render();

    this._selectWrapper = this.el.find(`#${this.id}-select`);
    this._select = this._selectWrapper[0];
    this._selectWrapper.styler();

    if (this.config && this.config.value) {
      this.value = this.config.value;
    }
  }
}

Factory.register('select', Select);
