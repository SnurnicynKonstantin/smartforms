import 'jquery.formstyler';

import './checkbox.scss';
import template from './checkbox.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Checkbox extends Base {
  get templateFn() {
    return template;
  }

  render() {
    super.render();

    this.el.find('input, checkbox').styler();
  }
}

Factory.register('checkbox', Checkbox);
