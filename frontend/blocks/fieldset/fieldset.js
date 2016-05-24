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
    this.el.children('div').append($(colTemplate()).append(block.el));
  }
}

Factory.register('fieldset', Fieldset);
