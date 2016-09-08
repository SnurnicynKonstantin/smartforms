import Container from '../container/container';
import template from './panel_group.jade';
import './panel_group.css';
import Factory from '../factory';

export default class PanelGroup extends Container {
  get templateFn() {
    return template;
  }

  afterRender() {
    super.afterRender();

    this.items.forEach(panel => panel.on('afterSubmit', (e, isValid, formValue, invoiceId) => this.trigger('afterSubmit', [isValid, formValue, invoiceId])));
  }

  appendChild(block) {
    this.el.append(block.el);
  }
}

Factory.register('panelGroup', PanelGroup);
