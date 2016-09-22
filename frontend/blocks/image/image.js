import Base from '../base/base';
import template from './image.jade';
import Factory from '../factory';
import './image.css';

export default class Image extends Base {
    get templateFn() {
        return template;
    }
}

Factory.register('image', Image);
