import Base from '../base/base';
import Factory from '../factory';

import Form from '../form/form';

import template from './modal.jade';
import helpTemplate from './help_modal.jade';

import './modal.css';

import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';
import parser from '../../services/parser';
import $ from 'jquery';

export default class Modal extends Base {
  constructor(config) {
    const finalConfig = cloneDeep(config);

    const iagreeContainer = finalConfig.iagree && finalConfig.iagree.container ? finalConfig.iagree.container : 'footer';

    if (finalConfig.iagree) {
      finalConfig.iagreeId = uniqueId();
      finalConfig.iagree = Object.assign({
        block: 'checkbox',
        checkboxCls: 'iagree',
        name: 'iagree',
        checked: true,
        id: finalConfig.iagreeId,
        labelWidth: 3
      }, finalConfig.iagree);
      finalConfig[iagreeContainer].push(finalConfig.iagree);
    }

    if (finalConfig.submitButton) {
      finalConfig.submitButtonId = uniqueId();
      finalConfig.submitButton = Object.assign({
        block: 'button',
        type: 'submit',
        label: 'Submit',
        cls: 'btn-primary',
        id: finalConfig.submitButtonId,
        labelWidth: 3
      }, finalConfig.submitButton);
      finalConfig[iagreeContainer].push(finalConfig.submitButton);
    }

    super(finalConfig);

    this._bodyForm = new Form({
      block: 'form',
      items: this.config.body,
      formHeader: this.config.formHeader
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
    this.el.find('button[type=submit]').click(e => this._onSubmit(e));
    this._bodyForm.afterRender();
    this._footerForm.afterRender();
    this.modalTitle = this.el.find('.header-title h4');

    const iagree = this.el.find(`input#${this.config.iagreeId}`);
    const submitButton = this.el.find(`button#${this.config.submitButtonId}`);

    if (Array.isArray(this.config.titleDependencies)) {
      this.config.titleDependencies.forEach(titleDependency => {
        const compiledDependencies = parser.parse(titleDependency.dependencies);

        compiledDependencies.identifiers.forEach(fieldName => {
          this._bodyForm.getItemByName(fieldName).on('change', () => this.resolveTitleDependencies(titleDependency.title, compiledDependencies));
        });

        this.resolveTitleDependencies(titleDependency.title, compiledDependencies);
      });
    }

    iagree.on('change', () => {
      submitButton.prop('disabled', () => !iagree.prop('checked'));
    }).change();

    if (this.config.help) {
      this.el.find('.modal-help a').on('click', () => {
        const helpModalTemplate = helpTemplate(Object.assign(this.getTemplateData(), this.templateDefaults));

        this.el.after(helpModalTemplate);

        const helpModal = $(`#help_modal_${this.id}`);
        helpModal.on('hidden.bs.modal', () => helpModal.remove());
      });
    }
  }

  _onSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      // submit form
    }
  }

  resolveTitleDependencies(title, compiledDependencies) {
    const isResolved = compiledDependencies.eval(this.context);

    if (isResolved) {
      this.modalTitle.html(title);
    }
  }
}

Factory.register('modal', Modal);
