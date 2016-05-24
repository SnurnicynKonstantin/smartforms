// Some code to test out lib
$(function () {
  var el = $('.smartform');

  smartforms.createForm(el, {
    cls: 'form',
    items: [{
      block: 'fieldset',
      label: 'Fieldset with layout',
      layout: [1, 2, 3],
      items: [{
        block: 'input',
        label: 'test',
        disabled: true,
        placeholder: 'test'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }]
    }, {
      block: 'fieldset',
      label: 'Fieldset without layout',
      items: [{
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1'
      }]
    }, {
      block: 'actions',
      items: [{
        block: 'button',
        label: 'OK',
        disabled: true,
        cls: 'btn-primary'
      }, {
        block: 'button',
        label: 'Cancel'
      }]
    }]
  });
});
