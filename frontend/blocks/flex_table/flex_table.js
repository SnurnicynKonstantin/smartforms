import Base from '../base/base';
import Factory from '../factory';

import template from './flex_table.jade';
import './flex_table.css';

function createAndAppendStyle(params) {
  const style = document.createElement('style');
  style.type = 'text/css';

  style.innerHTML = Object.keys(params).reduce((resultStyle, key) => {
    console.log(resultStyle);
    console.log(key);

    return resultStyle + `\n.${key}{${params[key]}}\n`;
  },
  ''
  );

  document.getElementsByTagName('head')[0].appendChild(style);
}

function generateStyles(_prefix, config) {
  const stylesConfig = {};

  config.relations.forEach((item, index) => {
    stylesConfig[`${_prefix}-flex_row__column-${index}`] = `flex-grow: ${item}`;
  });

  return stylesConfig;
}

export default class FlexTable extends Base {

  constructor(config) {
    super(config);
    this.rows = [];
    this._prefix = config._prefix ? config._prefix : this.templateDefaults._prefix;

    this.config.rows.forEach((row, rowNum) => {
      this.rows[rowNum] = [];
      row.forEach((column, columnNum) => {
        const CurrentClass = Factory.get(config.rows[rowNum][columnNum].block);
        this.rows[rowNum][columnNum] = new CurrentClass(config.rows[rowNum][columnNum]);
      });
    });
    createAndAppendStyle(generateStyles(this._prefix, this.config));
  }

  get templateFn() {
    return template;
  }

  render() {
    super.render();

    this.rows.forEach((row, rowId) => {
      row.forEach((item, columnId) => {
        item.render();
        this.el
          .find(`.${this._prefix}-flex-table_row__element-${rowId}-${columnId}`)
          .append(item.el);
      });
    });
  }
}

Factory.register('flexTable', FlexTable);
