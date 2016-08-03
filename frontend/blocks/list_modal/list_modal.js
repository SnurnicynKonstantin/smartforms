import Modal from '../modal/modal';
import configReader from '../../services/config_reader';
import Factory from '../factory';

import cloneDeep from 'lodash/cloneDeep';

import 'whatwg-fetch';

export default class ListModal extends Modal {
  constructor(config) {
    const finalConfig = configReader.createListModalConfig(cloneDeep(config));

    finalConfig.body = finalConfig.items.reduce((acc, item) => [...acc, ...item], []);
    finalConfig.footer = [];

    super(finalConfig);
  }

  initItems() {
    super.initItems();
  }
}

Factory.register('listModal', ListModal);
