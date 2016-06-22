import template from './button.jade';

import Base from '../base/base';
import Factory from '../factory';

import './button.css';

export default class Button extends Base {
  get templateFn() {
    return template;
  }
}

Factory.register('button', Button);
