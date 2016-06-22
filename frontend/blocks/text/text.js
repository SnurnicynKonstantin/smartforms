import Input from '../input/input';
import Factory from '../factory';

import './text.css';

import 'jquery.maskedinput/src/jquery.maskedinput';

export default class Text extends Input {

  render() {
    super.render();

    this._input = this.el.find('input:text');
    this._input.mask(this.config.mask, { placeholder: this.config.maskPlaceholder });
    this._input.addClass(`text-align-${this.config.textAlign || 'left'}`);

    this._input.on('input change', () => this.trigger('change', [this, this.value]));
  }

  get value() {
    return {
      [this.config.name]: this._input.val()
    };
  }

  set value(val) {
    this._input.val(val);
  }

  get name() {
    return this.config.name;
  }

  getTemplateData() {
    return Object.assign(super.getTemplateData(), { type: 'text' });
  }
}

Factory.register('text', Text);
