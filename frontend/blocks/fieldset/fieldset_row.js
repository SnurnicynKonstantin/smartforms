import Container from '../container/container';

import rowTemplate from './fieldset_row.jade';
import colTemplate from './fieldset_col.jade';

import Factory from '../factory';

import $ from 'jquery';

export default class FieldsetRow extends Container {
  get width() {
    return this.config.width;
  }

  get templateFn() {
    return rowTemplate;
  }

  appendChild(block) {
    const width = this.width && `col-xs-${this.width.shift()}`;
    this.el.append($(colTemplate({ width })).append(block.el));
  }

  validate() {
    return this.items.reduce((acc, block) => {
      const isValid = block.validate();

      if (acc && !isValid) {
        this.firstInvalidField = block;
      }

      return isValid && acc;
    }, true);
  }

  focus() {
    this.firstInvalidField.focus();
  }

  hideErrors() {
    this.items.forEach(block => block.popover('hide'));
  }
}

Factory.register('fieldsetRow', FieldsetRow);
