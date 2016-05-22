import './base.scss';

import cloneDeep from 'lodash/cloneDeep';

class Block {
    constructor(parent, config) {
        this._el = null;
        this._parent = parent;
        this._config = cloneDeep(config);
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
