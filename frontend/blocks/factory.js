class Factory {
    constructor() {
        this._blocks = {};
    }

    register(alias, block) {
        if (this._blocks.hasOwnProperty(alias)) {
            throw new Error('Block ${alias} is already registered.');
        } else {
            this._blocks[alias] = block;
        }
    }

    get(alias) {
        if (this._blocks.hasOwnProperty(alias)) {
            return this._blocks[alias];
        } else {
            throw new Error('Block ${alias} is not registered.');
        }
    }
}

export default new Factory();
