import 'jquery.formstyler';

import './select.scss';
import template from './select.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Select extends Base {
  get templateFn() {
    return template;
  }
  render() {
    super.render();

    this.el.find('input, select').styler();
  }
}

Factory.register('select', Select);
