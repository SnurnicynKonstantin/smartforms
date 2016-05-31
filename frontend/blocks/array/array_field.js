import uniqueId from 'lodash/uniqueId';

import Container from '../base/container';
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
        value: item.value,
        name: item.name,
        textAlign: item.textAlign || 'right'
      }
    ]], []);

    const finalConfig = Object.assign({}, config, { items: [{
      block: 'fieldset',
      id: fieldsetId,
      label: config.fieldsetLabel,
      name: config.fieldsetName,
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
    this.addBtn.el.on('click', this.onAddNewRow.bind(this));
    this.fieldset.items.forEach(row => {
      row.items[0].el.on('click', () => {
        this.removeRowById(row.id);
      });
    });
  }

  get templateFn() {
    return template;
  }

  appendChild(block) {
    this.el.append(block.el);
  }

  onAddNewRow() {
    if (this.maxLength <= this.currentLength) {
      this.addBtn.showHelpMessage();

      return;
    }

    if (this.select && this.select.value && '' !== this.select.value[this.config.actions.select.name]) {
      const row = this.fieldset.addRow({
        width: [1, 8, 3],
        items: [this.config.removeButton, {
          block: 'label',
          labelText: this.select.name,
          rightMark: this.config.labelRightMark
        }, {
          block: 'text',
          value: '0.00',
          name: this.select.value,
          textAlign: 'right'
        }]
      });

      this.currentLength++;
      row.items[0].el.on('click', () => {
        this.removeRowById(row.id);
      });
    } else {
      this.select.showErrorMessage();
    }
  }

  removeRowById(id) {
    this.fieldset.removeRowById(id);
    this.currentLength--;
  }
}

Factory.register('array', ArrayField);
