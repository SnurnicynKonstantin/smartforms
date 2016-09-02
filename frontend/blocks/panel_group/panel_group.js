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
  }

  appendChild(block) {
    this.el.append(block.el);
  }
}

Factory.register('panelGroup', PanelGroup);
