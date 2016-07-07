import $ from 'jquery';

import cloneDeep from 'lodash/cloneDeep';
import defaults from 'lodash/defaults';
import uniqueId from 'lodash/uniqueId';

import parser from '../../services/parser';
import './base.css';

export default class Base {
  constructor(config) {
    this._el = null;
    this._parent = null;
    this._id = config.id || uniqueId();
    this._config = cloneDeep(config);
  }

  render() {
    const tplData = defaults(this.getTemplateData(), this.templateDefaults);

    this._el = $(this.templateFn(tplData));
  }

  afterRender() {
    if (!Array.isArray(this.config.validationRules)) {
      return;
    }

    this.compiledRules = this.config.validationRules.map(rule => Object.assign({
      compiledRule: parser.parse(rule.rule)
    }, rule));
  }

  get context() {
    let parent = this.parent;

    while (parent && null !== parent.parent) {
      parent = parent.parent;
    }

    return Object.assign({ fieldName: this.name }, parent && parent.value || this.value);
  }

  validate() {
    if (!this.checkCompiledRules()) {
      return false;
    }
    this.popover('destroy');
    this._popoverExist = false;
    this.removeErrorClass();

    return true;
  }

  checkCompiledRules() {
    if (!this.compiledRules) {
      return true;
    }

    const invalidRule = this.compiledRules.find(rule => !rule.compiledRule.eval(this.context));

    if (!invalidRule) {
      return true;
    }
    this.showErrorMessage(invalidRule.errorMessage);

    return false;
  }

  showErrorMessage(message) {
    this.errorMessage = message;
    if (!this._popoverExist) {
      this.popover({
        placement: this.config.popoverPlacement || 'top',
        content: this.getErrorMessageFn(),
        trigger: 'focus'
      });
      this._popoverExist = true;
    }
    this.addErrorClass();
  }

  on(...args) {
    $(this).on(...args);

    return this;
  }

  trigger(...args) {
    $(this).trigger(...args);

    return this;
  }

  hide() {
    if (this.isHidden) {
      return;
    }

    this._isHidden = true;
    this.el.hide();
    this.trigger('hide', this);
  }

  show() {
    if (!this.isHidden) {
      return;
    }

    this._isHidden = false;
    this.el.show();
    this.trigger('show', this);
  }

  get isHidden() {
    return this._isHidden;
  }

  get isValid() {
    return true;
  }

  get value() {
    return {};
  }

  set value(val) {
  }

  get el() {
    return this._el;
  }

  set el(e) {
    this._el = e;
  }

  get config() {
    return this._config;
  }

  get parent() {
    return this._parent;
  }

  set parent(p) {
    this._parent = p;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.config.name;
  }

  getErrorMessageFn() {
    return () => this.errorMessage;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(message) {
    this._errorMessage = message;
  }

  getTemplateData() {
    return Object.assign({}, this.config, {
      showLabel: !this.config.suppressLabel && this.config.label
    });
  }

  get popoverEl() {
    return this.el;
  }

  get focusEl() {
    return this.el;
  }

  focus() {
    this.focusEl.focus();
  }

  popover(opt) {
    this.popoverEl.popover(opt);
  }

  get templateDefaults() {
    return {
      _prefix: 'smartforms',
      id: this.id,
      cls: '',
      value: '',
      required: false,
      readOnly: false,
      disabled: false,
      append: null,
      prepend: null,
      helpMessage: {
        fontColor: '#96a7b7',
        fontSize: '14'
      },
      placeholder: null,
      suppressLabel: false
    };
  }

  get errorEl() {
    return this.el;
  }

  addErrorClass() {
    this.errorEl.addClass('has-error');
  }

  removeErrorClass() {
    this.errorEl.removeClass('has-error');
  }
}
