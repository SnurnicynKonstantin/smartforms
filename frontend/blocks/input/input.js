import './input.scss';
import template from './input.jade';

import Base from '../base/base';
import Factory from '../../factory';

import $ from 'jquery';
import defaults from 'lodash/defaults';

export default class Input extends Base {
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

Factory.register('input', Input);
