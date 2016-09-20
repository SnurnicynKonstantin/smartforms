import Base from '../base/base';
import template from './image.jade';
import Factory from '../factory';
import './image.css';

export default class Image extends Base {
    get templateFn() {
        return template;
    }

    get value() {
        console.log(`get val ${this.val}`);
    }

    set value(val) {
        console.log(`set val ${val}`);
    }
}

Factory.register('image', Image);
