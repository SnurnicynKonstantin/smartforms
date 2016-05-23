import './actions.scss';
import template from './actions.jade';

import Container from '../base/container';
import Factory from '../factory';

export default class Actions extends Container {
    constructor(config) {
        super(config);
    }

    get templateFn() {
        return template;
    }

    appendChild(block) {
        this.el.append(block.el);
    }
}

Factory.register('actions', Actions);
