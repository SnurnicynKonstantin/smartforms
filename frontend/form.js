import Actions from './blocks/actions/actions';
import Input from './blocks/input/input';
import Button from './blocks/button/button';

import $ from 'jquery';
import _ from 'lodash';

import Factory from './factory';

import Parser from 'morph-expressions';

export default class Form {
    constructor(el, config) {
        this._id = _.uniqueId();
        this._el = el;
        this._config = _.cloneDeep(config);

        this._initItems();
    }

    _initItems() {
        let form = this;

        this._items = _.map(this._config.items, block_config => {
            let block_ctor = Factory.get(block_config['block']);

            return new block_ctor(form, _.defaults({
                id: form.id
            }, block_config));
        });
    }

    get id() {
        return this._id;
    }

    test() {
        const parser = new Parser();
        console.log(parser.parseAndEval('3 * (1 + 2)'));
    }

    render() {
        this._el.append('<div/>');

        let form = this;

        _.forEach(this._items, block => {
            block.render();
            form._append(block);
        });
    }

    _append(block) {
        this._el.children().append(block.el);
    }
}
