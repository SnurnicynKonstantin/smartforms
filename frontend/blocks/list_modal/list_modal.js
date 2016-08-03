import Modal from '../modal/modal';
import configReader from '../../services/config_reader';
import Factory from '../factory';

import cloneDeep from 'lodash/cloneDeep';

export default class ListModal extends Modal {
  constructor(config) {
    const finalConfig = configReader.createListModalConfig(cloneDeep(config));

    finalConfig.body = finalConfig.items.reduce((acc, item) => [...acc, ...item], []);
    finalConfig.footer = [];

    super(finalConfig);
  }

  static prepareConfig(config) {
    return cloneDeep(config);
  }

  initItems() {
    super.initItems();
  }
}

Factory.register('listModal', ListModal);
