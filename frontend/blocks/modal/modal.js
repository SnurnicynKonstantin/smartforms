import Base from '../base/base';
import Factory from '../factory';

import Form from '../form/form';

import template from './modal.jade';
import './modal.scss';

export default class Modal extends Base {
  constructor(config) {
    super(config);

    this._bodyForm = new Form({
      block: 'form',
      items: this.config.body
    });

    this._footerForm = new Form({
      block: 'form',
      cls: 'form form-horizontal',
      items: this.config.footer
    });
  }

  get templateFn() {
    return template;
  }

  validate() {
    return this._bodyForm.validate() && this._footerForm.validate();
  }

  get isValid() {
    return this._bodyForm.isValid && this._footerForm.isValid;
  }

  get value() {
    return Object.assign(this._bodyForm.value, this._footerForm.value);
  }

  render() {
    super.render();

    this._bodyForm.render();
    this._footerForm.render();

    this.el.find('.modal-body').append(this._bodyForm.el);
    this.el.find('.modal-footer').append(this._footerForm.el);
  }

  afterRender() {
    this._footerForm.el.find('button[type=submit]').click(e => this._onSubmit(e));
    this._bodyForm.afterRender();
    this._footerForm.afterRender();
  }

  _onSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      // submit form
    }
  }
}

Factory.register('modal', Modal);
