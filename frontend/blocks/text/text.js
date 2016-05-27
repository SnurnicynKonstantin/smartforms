import Input from '../input/input';
import Factory from '../factory';
import 'jquery.maskedinput/src/jquery.maskedinput';

export default class Text extends Input {

  render() {
    super.render();

    this._input = this.el.find('input:text');
    this._input.mask(this.config.mask, {placeholder: this.config.maskPlaceholder});
  }

  get value() {
    return {
      [this.config.name]: this._input.val()
    };
  }

  set value(val) {
    this._input.val(val);
  }

  getTemplateData() {
    return Object.assign(super.getTemplateData(), {type: 'text'});
  }
}

Factory.register('text', Text);
