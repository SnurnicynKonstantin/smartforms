import Actions from './blocks/actions/actions';
import Input from './blocks/input/input';
import Button from './blocks/button/button';
import Form from './blocks/form/form'

function createForm(el, config) {
    let form = new Form(config);

    form.render();

    el.replaceWith(form.el);

    form.afterRender();
}

module.exports = {
    createForm
};
