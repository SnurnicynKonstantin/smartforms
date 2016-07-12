import template from './link.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Link extends Base {
  get templateFn() {
    return template;
  }
}

Factory.register('link', Link);
