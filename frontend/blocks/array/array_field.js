import uniqueId from 'lodash/uniqueId';
import cloneDeep from 'lodash/cloneDeep';
import findKey from 'lodash/findKey';
import size from 'lodash/size';

import Container from '../container/container';
import Factory from '../factory';

import './array_field.scss';
import template from './array_field.jade';

export default class ArrayField extends Container {
  constructor(config) {
    const fieldsetId = uniqueId();
    const addBtnId = uniqueId();
    const selectId = uniqueId();
    const editorId = uniqueId();

    const items = config.items;
    const fieldsetItems = Object.keys(items || {}).reduce((acc, key) => Object.assign(acc, {
      [`${key}-removeButton`]: config.removeButton,
      [`${key}-label`]: {
        block: 'label',
        labelText: items[key].label,
        rightMark: config.labelRightMark
      },
      [key]: {
        block: 'text',
        value: items[key].value || '',
        name: items[key].name,
        textAlign: config.newItemInputTextAlign
      }
    }), {});

    if (!config.actions) {
      throw new Error("Array block should contain 'actions' property");
    }

    const finalConfig = Object.assign({}, config, {
      items: {
        fieldset: {
          block: 'fieldset',
          id: fieldsetId,
          label: config.itemLabel,
          labelWidth: config.itemLabel ? 3 : 0,
          layout: Object.keys(items || {}).map(() => {
            return {count: 3, width: [1, 8, 3]};
          }),
          items: fieldsetItems
        },
        actions: {
          block: 'actions',
          id: editorId,
          items: {
            [uniqueId('label')]: Object.assign({}, config.actions.label, {
              cls: config.actions.label.cls || 'col-sm-3'
            }),
            [uniqueId('select')]: Object.assign({}, config.actions.select, {
              cls: config.actions.select.cls || 'col-sm-7',
              id: selectId
            }),
            [uniqueId('input')]: Object.assign({}, config.actions.addButton, {
              cls: config.actions.addButton.cls || 'col-sm-2',
              id: addBtnId
            })
          }
        }
      }
    });

    super(finalConfig);

    this.maxLength = config.maxLength;
    this.currentLength = size(items);
    this.editor = this.getItemById(editorId);
    this.addBtn = this.editor.getItemById(addBtnId);
    this.fieldset = this.getItemById(fieldsetId);
    this.select = this.editor.getItemById(selectId);
  }

  afterRender() {
    this.addBtn.el.on('click', () => {
      this.addNewRow({
        labelText: this.select.nameOfValue,
        value: this.config.defaultValueForNewItem || '',
        name: this.select.value
      });
    });

    this.fieldset.itemsValues.forEach(row => {
      row.itemsValues[0].el.on('click', () => {
        this.removeRowById(row.id);
      });
    });
    super.afterRender();
  }

  get templateFn() {
    return template;
  }

  get value() {
    return this.fieldset.itemsValues.reduce((acc, item) => {
      const textKey = findKey(item.items, o => 'text' === o.config.block);

      return Object.assign(acc, { [textKey]: item.items[textKey].value});
    }, {});
  }

  set value(val) {
    cloneDeep(this.fieldset.items).forEach(row => this.removeRowById(row.id));
    val.forEach(row => this.addNewRow(row));
  }

  appendChild(block) {
    this.el.find('.form-array').append(block.el);
  }

  addNewRow(row) {
    if (this.maxLength <= this.currentLength) {
      this.addBtn.popover({
        placement: 'top',
        content: this.config.helpMessage
      });

      return;
    }

    if (row && '' !== row.name) {
      const newRow = this.fieldset.addRow({
        width: [1, 8, 3],
        items: {
          [`${row.name}-removeButton`]: this.config.removeButton,
          [`${row.name}-label`]: {
            block: 'label',
            labelText: row.labelText,
            rightMark: this.config.labelRightMark
          },
          [`${row.name}`]: {
            block: 'text',
            value: row.value,
            textAlign: this.config.newItemInputTextAlign
          }
        },
        itemsOrder: [`${row.name}-removeButton`, `${row.name}-label`, `${row.name}`]
      });

      this.currentLength++;
      newRow.itemsValues[0].el.on('click', () => {
        this.removeRowById(newRow.id);
      });
      this.select.removeOptionByValue(row.name);
    } else {
      this.select.popover({
        placement: 'top',
        content: this.config.errorMessage
      });
    }
  }

  removeRowById(id) {
    const rowKey = this.fieldset.itemsKeys.find(key => this.fieldset.items[key].id === id);
    const row = this.fieldset.items[rowKey];

    this.select.addOption({
      value: row.items[Object.keys(row.items)[2]].name,
      text: row.items[Object.keys(row.items)[1]].dataText
    });
    this.select.sortOptionsByText();
    this.fieldset.removeRowById(id);
    this.currentLength--;

    delete this.fieldset.items[rowKey];
  }

  get sum() {
    return this.fieldset.itemsValues.reduce((acc, row) => acc + parseFloat(row.itemsValues[2].value), 0);
  }
}

Factory.register('array', ArrayField);
