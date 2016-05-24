import Actions from './blocks/actions/actions';
import Input from './blocks/input/input';
import Button from './blocks/button/button';
import Fieldset from './blocks/fieldset/fieldset';
import Form from './blocks/form/form';

function createForm(el, config) {
  const form = new Form(config);

  form.render();

  el.replaceWith(form.el);

  form.afterRender();
}

module.exports = {
  createForm
};
