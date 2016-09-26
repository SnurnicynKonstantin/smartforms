import Base from '../base/base';
import Factory from '../factory';

import template from './flex-table.jade';
import './flex-table.css';

export default class FlexTable extends Base {
    constructor(config) {
        super(config);
        this.rows = [];

        for (var rowNum in this.config.rows) {
            this.rows[rowNum] = [];
            for (var columnNum in this.config.rows[rowNum]) {
                const CurrentClass = Factory.get(this.config.rows[rowNum][columnNum].block);
                this.rows[rowNum][columnNum] = new CurrentClass(this.config.rows[rowNum][columnNum]);
            }
        }

        //------set styles
        this.tableStyle = "";
        this.rowStyle = "";

        for (var styleKey in this.config.tableStyle) {
            this.tableStyle += styleKey + ": " + this.config.tableStyle[styleKey] + "; ";
        }
        for (var styleKey in this.config.rowStyle) {
            this.rowStyle += styleKey + ": " + this.config.rowStyle[styleKey] + "; ";
        }

        this.config.tableStyle = this.tableStyle;
        this.config.rowStyle = this.rowStyle;

    }
    get templateFn() {
        return template;
    }


    render() {
        super.render();

        for (var rowId in this.rows) {
            for (var columnId in this.rows[rowId]) {
                this.rows[rowId][columnId].render();
                this.el
                    .find('#flexbox-item-' + rowId + '-' + columnId)
                    .append(this.rows[rowId][columnId].el);
            }
        }
    }
}

Factory.register("flex-table", FlexTable);