import Base from '../base/base';
import Factory from '../factory';

import template from './flex-table.jade';
import './flex-table.css';

export default class FlexTable extends Base {
    constructor(config) {
        super(config);
        console.log(config);
    }
    get templateFn() {
        return template;
    }
}

Factory.register("flex-table", FlexTable);