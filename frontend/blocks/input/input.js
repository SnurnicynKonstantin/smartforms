import './input.scss';
import template from './input.jade';

import Base from '../base/base';
import Factory from '../../factory';

import $ from 'jquery';
import _ from 'lodash';

export default class Input extends Base {
    constructor(parent, config) {
        super(parent, config);
    }

    get templateFn() {
        return template;
    }

    render() {
        let tplData = _.defaults(this.config, this.templateDefaults);

        this.el = $(this.templateFn(tplData));
    }
}

Factory.register('input', Input);
