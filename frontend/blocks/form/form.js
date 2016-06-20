import Container from '../container/container';

import template from './form.jade';
import parser from '../../services/parser';

import './form.scss';

export default class Form extends Container {
  get templateFn() {
    return template;
  }

  render() {
    super.render();

    this.items.forEach(block => {
      if (block.config.dependencies) {
        const compiledDependencies = parser.parse(block.config.dependencies);

        compiledDependencies.identifiers.forEach(fieldName => {
          this.getItemByName(fieldName).on('change hide show', () => this.resolveDependencies(block, compiledDependencies));
        });

        this.resolveDependencies(block, compiledDependencies);
      }
    });
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
    return this.items.every(block => block.isHidden || block.validate());
  }

  appendChild(block) {
    this.el.children().append(block.el);
  }
}
