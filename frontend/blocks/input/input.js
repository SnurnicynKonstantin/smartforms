import './input.scss';
import template from './input.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Input extends Base {
    constructor(config) {
        super(config);
    }

    get templateFn() {
        return template;
    }
}

Factory.register('input', Input);
