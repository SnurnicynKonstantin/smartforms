import Base from '../base/base';
import Factory from '../factory';

import template from './flex-table.jade';
import './flex-table.css';


function createAndAppendStyle(params) {
  const style = document.createElement('style');
  style.type = 'text/css';

  const styleContent = Object.keys(params).reduce((resultStyle, key) => {
    return resultStyle + `.${key}{${params[key]}}\n`;
  });

  style.innerHTML = styleContent;
  document.getElementsByTagName('head')[0].appendChild(style);
}

function generateStyles(_prefix, config) {
  const stylesConfig = {};

  if (config.objectsOrientation && 'vertical' === config.objectsOrientation) {
    stylesConfig[`${_prefix}-flex-table`] = `flex-direction: row${config.reverse ? '-reverse' : ''}; `;
    stylesConfig[`${_prefix}-flex-table_row`] = 'flex-direction: column; ';
  } else {
    stylesConfig[`${_prefix}-flex-table`] = `flex-direction: column${config.reverse ? '-reverse' : ''}; `;
  }
  config.relations.forEach(function (item, index) {
    stylesConfig[`${_prefix}-flex_row__column-${index}`] = `flex-grow: ${item}`;
  });

  return stylesConfig;
}

export default class FlexTable extends Base {

  constructor(config) {
    super(config);
    const rows = [];
    this.rows = rows;
    this._prefix = config._prefix ? config._prefix : this.templateDefaults._prefix;

    this.config.rows.forEach(function (row, rowNum) {
      rows[rowNum] = [];
      row.forEach(function (column, columnNum) {
        const CurrentClass = Factory.get(config.rows[rowNum][columnNum].block);
        rows[rowNum][columnNum] = new CurrentClass(config.rows[rowNum][columnNum]);
      });
    });

    createAndAppendStyle(generateStyles(this._prefix, this.config));
  }

  get templateFn() {
    return template;
  }

  render() {
    super.render();

    const el = this.el;

    const prefix = this._prefix;

    this.rows.forEach(function (row, rowId) {
      row.forEach(function (item, columnId) {
        item.render();
        el
          .find(`.${prefix}-flex-table_row__element-${rowId}-${columnId}`)
          .append(item.el);
      });
    });
  }
}

Factory.register('flex-table', FlexTable);
