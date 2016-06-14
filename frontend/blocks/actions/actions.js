import './actions.scss';
import template from './actions.jade';

import Container from '../container/container';
import Factory from '../factory';

export default class Actions extends Container {
  get templateFn() {
    return template;
  }

  appendChild(block) {
    this.el.append(block.el);
  }

  get value() {
    return null;
  }
}

Factory.register('actions', Actions);
