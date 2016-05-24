import template from './fieldset.jade';
import colTemplate from './fieldset_col.jade';

import './fieldset.scss';

import Container from '../base/container';
import Factory from '../factory';

import $ from 'jquery';

export default class Fieldset extends Container {
  constructor(config) {
    config.inputSetClass = 'input-set';
    config.inputSetRowClass = 'input-set-row';
    config.inputSetColClass = 'input-set-col';
    config.layout = Array.isArray(config.layout) ? config.layout : [config.items.length];

    super(config);
  }

  get templateFn() {
    return template;
  }

  initItems() {
    this.config.items.forEach(blockConfig => {
      blockConfig.suppressLabel = true;
    });

    super.initItems();
  }

  appendChild(block) {
    const index = this.config.layout.findIndex(x => 0 !== x);
    this.config.layout[index]--;

    this.el.children('div').eq(index).append($(colTemplate(this.config)).append(block.el));
  }
}

Factory.register('fieldset', Fieldset);
