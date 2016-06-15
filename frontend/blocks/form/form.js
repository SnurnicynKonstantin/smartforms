import Container from '../container/container';

import template from './form.jade';

import pickBy from 'lodash/pickBy';

export default class Form extends Container {
  get templateFn() {
    return template;
  }

  validate() {
    return this.itemsKeys.some(key => !this.items[key].validate());
  }

  appendChild(block) {
    this.el.children().append(block.el);
  }

  get value() {
    return pickBy(super.value, o => null !== o);
  }
}
