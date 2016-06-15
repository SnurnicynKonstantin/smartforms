import template from './fieldset.jade';

import './fieldset.scss';

import Container from '../container/container';
import Factory from '../factory';

import uniqueId from 'lodash/uniqueId';
import size from 'lodash/size';
import mapValues from 'lodash/mapValues';
import findKey from 'lodash/findKey';

export default class Fieldset extends Container {
  constructor(config) {
    const finalConfig = Object.assign({}, config);

    finalConfig.layout = Array.isArray(config.layout) ? config.layout : [{count: size(config.items)}];
    finalConfig.layout = finalConfig.layout.map(rowConfig => Number.isInteger(rowConfig) ? {count: rowConfig} : rowConfig);

    let start = 0;

    finalConfig.items = finalConfig.layout.map(rowConfig => {
      const result = {
        block: 'fieldsetRow',
        width: rowConfig.width
      };

      const itemsKeys = Object.keys(config.items).slice(start, start + rowConfig.count);
      start += rowConfig.count;

      result.items = itemsKeys.reduce((acc, key) => Object.assign(acc, {[key]: config.items[key]}), {});

      result.items = mapValues(result.items, item => {
        item.suppressLabel = true;

        return item;
      });

      return result;
    }, {}).reduce((acc, item) => Object.assign(acc, {[uniqueId()]: item}), {});

    super(finalConfig);
  }

  get templateFn() {
    return template;
  }

  addRow(config, index = 'last') {
    const RowConstructor = Factory.get('fieldsetRow');
    const row = new RowConstructor(config);

    const finalIndex = (!Number.isInteger(index) || index >= this.items.length) ? 'last' : index;

    row.parent = this;
    row.render();

    this.items[uniqueId()] = row;

    const appendChildWithIndex = {
      last: () => this.el.find('.fieldset-rows-container').append(row.el),
      number: number => this.el.find('.input-set-row').eq(finalIndex).before(row.el)
    };

    (appendChildWithIndex[finalIndex] || appendChildWithIndex.number)(finalIndex);

    return row;
  }

  validate() {
    return this.itemsKeys.reduce((acc, key) => this.items[key].validate() && acc, true);
  }

  removeRowById(id) {
    const key = findKey(this.items, item => id === item.id);
    this.items[key].el.remove();
    delete this.items[key];
  }

  appendChild(block) {
    this.el.find('.fieldset-rows-container').append(block.el);
  }

  getItemByName(name) {
    return this.items[findKey(this.items, item => item.items.hasOwnProperty(name))].items[name];
  }

}

Factory.register('fieldset', Fieldset);
