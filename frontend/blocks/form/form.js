import Container from '../container/container';

import template from './form.jade';
import parser from '../../services/parser';
import forEach from 'lodash/forEach';

import './form.css';

export default class Form extends Container {
  get templateFn() {
    return template;
  }

  render() {
    super.render();

    this.items.forEach(block => {
      this.initBlockDependencies(block);
      this.initBlockSummarize(block);
    });
  }

  initBlockSummarize(block) {
    if (block.config.summarize && Array.isArray(block.config.summarize)) {
      block.config.summarize.forEach(fieldName => {
        this.getItemByName(fieldName).on('change', () => this.changeSum(block));
      });

      this.changeSum(block);
    }
  }

  changeSum(block) {
    block.value = parseFloat(block.config.summarize.reduce((acc, fieldName) => {
      const field = this.getItemByName(fieldName);
      if ('array' === field.config.block) {
        return acc + field.sum;
      }

      return acc + (parseFloat(field.value[field.name]) || 0);
    }, 0)).toFixed(2);
  }

  initBlockDependencies(block) {
    if (block.config.dependencies) {
      const compiledDependencies = parser.parse(block.config.dependencies);

      compiledDependencies.identifiers.forEach(fieldName => {
        this.getItemByName(fieldName).on('change hide show', () => this.resolveDependencies(block, compiledDependencies));
      });

      this.resolveDependencies(block, compiledDependencies);
    }
  }

  resolveDependencies(block, compiledDependencies) {
    const isResolved = compiledDependencies.eval(this.context);

    block[isResolved ? 'show' : 'hide']();
  }

  get value() {
    const result = {};

    this.items.filter(block => !block.isHidden).forEach(block => Object.assign(result, block.value));

    return this.config.name ? { [this.config.name]: result } : result;
  }

  set value(val) {
    // TODO realization of set value function
  }

  validate() {
    return this.items.every(block => {
      const isValid = block.isHidden || block.validate();

      if (!isValid) {
        block.focus();
      }

      return isValid;
    });
  }

  appendChild(block) {
    this.el.children('.form-content').append(block.el);
  }

  showErrors(errors) {
    forEach(errors, (errorMsg, fieldName) => {
      const field = this.getItemByName(fieldName);

      field.showErrorMessage(errorMsg);
    });
  }
}
