import Container from '../base/container';

import template from './form.jade';

export default class Form extends Container {
  get templateFn() {
    return template;
  }

  appendChild(block) {
    this.el.children().append(block.el);
  }
}
