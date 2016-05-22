import template from './button.jade';

import Base from '../base/base';
import Factory from '../../factory';

import $ from 'jquery';

import defaults from 'lodash/defaults';

export default class Button extends Base {
    constructor(parent, config) {
        super(parent, config);
    }

    get templateFn() {
        return template;
    }

    render() {
        let tplData = defaults(this.config, this.templateDefaults);

        this.el = $(this.templateFn(tplData));
    }
}

Factory.register('button', Button);
