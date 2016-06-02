import uniqueId from 'lodash/uniqueId';
import cloneDeep from 'lodash/cloneDeep';

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
    const fieldsetItems = config.items.reduce((acc, item) => [...acc, ...[
      config.removeButton,
      {
        block: 'label',
        labelText: item.label,
        rightMark: config.labelRightMark
      }, {
        block: 'text',
        value: item.value || '',
        name: item.name,
        textAlign: config.newItemInputTextAlign
      }
    ]], []);

    const finalConfig = Object.assign({}, config, { items: [{
      block: 'fieldset',
      id: fieldsetId,
      label: config.itemLabel,
      labelWidth: config.itemLabel ? 3 : 0,
      layout: config.items.map(() => {
        return {count: 3, width: [1, 8, 3]};
      }),
      items: fieldsetItems
    }, {
      block: 'actions',
      id: editorId,
      items: [
        Object.assign(config.actions.label, {
          cls: config.actions.label.cls || 'col-sm-3'
        }),
        Object.assign(config.actions.select, {
          cls: config.actions.select.cls || 'col-sm-7',
          id: selectId
        }),
        Object.assign(config.actions.addButton, {
          cls: config.actions.addButton.cls || 'col-sm-2',
          id: addBtnId
        })
      ]
    }]});

    super(finalConfig);

    this.maxLength = config.maxLength;
    this.currentLength = config.items.length;
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
        name: this.select.value[this.select.name]
      });
    });
    this.fieldset.items.forEach(row => {
      row.items[0].el.on('click', () => {
        this.removeRowById(row.id);
      });
    });
  }

  get templateFn() {
    return template;
  }

  get value() {
    return {
      [this.config.name]: this.fieldset.items.reduce((acc, row) => Object.assign(acc, row.items[2].value), {})
    };
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
        items: [this.config.removeButton, {
          block: 'label',
          labelText: row.labelText,
          rightMark: this.config.labelRightMark
        }, {
          block: 'text',
          value: row.value,
          name: row.name,
          textAlign: this.config.newItemInputTextAlign
        }]
      });

      this.currentLength++;
      newRow.items[0].el.on('click', () => {
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
    const row = this.fieldset.getItemById(id);

    this.select.addOption({
      value: row.items[2].name,
      text: row.items[1].dataText
    });
    this.select.sortOptionsByText();
    this.fieldset.removeRowById(id);
    this.currentLength--;
  }
}

Factory.register('array', ArrayField);
