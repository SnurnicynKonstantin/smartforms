import Container from '../base/container';

import template from './form.jade';

export default class Form extends Container {
    constructor(config) {
        super(config);
    }

    get templateFn() {
        return template;
    }

    appendChild(block) {
        this._el.children().append(block.el);
    }
}
