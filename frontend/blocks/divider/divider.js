import Factory from '../factory';
import Base from '../base/base';

import $ from 'jquery';

export default class Divider extends Base {
  render() {
    this._el = $('<hr>');
  }
}

Factory.register('divider', Divider);
