import './base.scss';

import _ from 'lodash';

class Block {
    constructor(parent, config) {
        this._el = null;
        this._parent = parent;
        this._config = _.cloneDeep(config);
    }

    render() {
        throw new Error('Not implemented.');
    }

    get el() {
        return this._el;
    }

    set el(e) {
        this._el = e;
    }

    get config() {
        return this._config;
    }

    get parent() {
        return this._parent;
    }

    get templateDefaults() {
        return {
            clsPrefix: 'jsonform',
            cls: '',
            value: '',
            required: false,
            readOnly: false,
            disabled: false,
            append: null,
            prepend: null,
            description: null
        }
    }
}

export default Block;
