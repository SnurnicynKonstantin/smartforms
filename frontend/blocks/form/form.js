import Container from '../container/container';

import template from './form.jade';

export default class Form extends Container {
  get templateFn() {
    return template;
  }

  validate() {
    return this.items.some(block => !block.validate());
  }

  appendChild(block) {
    this.el.children().append(block.el);
  }
}
