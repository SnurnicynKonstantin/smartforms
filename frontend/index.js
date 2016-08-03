import './blocks/actions/actions';
import './blocks/button/button';
import './blocks/checkbox/checkbox';
import './blocks/date/date';
import './blocks/fieldset/fieldset';
import './blocks/fieldset/fieldset_row';
import './blocks/input/input';
import './blocks/select/select';
import './blocks/static/static';
import './blocks/text/text';
import './blocks/label/label';
import './blocks/array/array_field';
import './blocks/divider/divider';
import './blocks/address/address';
import './blocks/radiogroup/radiogroup';
import './blocks/comment/comment';
import './blocks/link/link';
import './blocks/table/table';
import './blocks/radiogroup_with_containers/radiogroup_container';
import './blocks/radiogroup_with_containers/radiogroup_with_containers';
import './blocks/check_group_list/check_group_list';
import './blocks/check_group_list_item/check_group_list_item';
import './blocks/image_group/image_group';

import Modal from './blocks/modal/modal';
import ListModal from './blocks/list_modal/list_modal';

import Form from './blocks/form/form';

import configReader from './services/config_reader';
import './services/mask_initializer';

function createForm(el, config) {
  const form = new Form(configReader.createFormConfig(config));

  form.render();

  el.replaceWith(form.el);

  form.afterRender();

  return form;
}

function createModal(el, config) {
  function getModalConfig(_config) {
    return {
      'modal': () => configReader.createModalConfig(_config),
      'listModal': () => _config
    }[_config.block];
  }

  const ModalCtor = {
    'modal': Modal,
    'listModal': ListModal
  };
  const modal = new ModalCtor[config.block](getModalConfig(config)());

  modal.render();

  el.replaceWith(modal.el);

  modal.afterRender();

  return modal;
}

module.exports = {
  createForm,
  createModal
};
