import './blocks/actions/actions';
import './blocks/input/input';
import './blocks/button/button';
import './blocks/select/select';
import './blocks/checkbox/checkbox';
import './blocks/fieldset/fieldset';
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
