import Base from './base';
import Factory from '../factory';

import defaults from 'lodash/defaults';
import assign from 'lodash/assign';

export default class Container extends Base {
  constructor(config) {
    super(config);

    this.initItems();
  }

  initItems() {
    this._items = this.config.items.map(blockConfig => {
      const BlockCtor = Factory.get(blockConfig['block']);

      const block = new BlockCtor(defaults({
        id: this.id
      }, blockConfig));

      block.parent = this;

      return block;
    });
  }

  render() {
    super.render();

    this.items.forEach(block => {
      block.render();
      this.appendChild(block);
    });
  }

  validate() {
    return this.items.every(block => {
      return block.validate();
    });
  }

  get isValid() {
    return this.items.every(block => {
      return block.isValid;
    });
  }

  get value() {
    const result = {};

    this.items.forEach(block => {
      assign(result, block.value);
    });

    return result;
  }

  set value(val) {
  }

  appendChild(block) {
    throw new Error('Not implemented');
  }

  afterRender() {
    this.items.forEach(block => {
      block.afterRender();
    });
  }

  get items() {
    return this._items;
  }
}
