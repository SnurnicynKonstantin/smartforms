// Some code to test out lib
$(function () {
  var el = $('.smartform');

  smartforms.createForm(el, {
    cls: 'form',
    items: [{
      block: 'fieldset',
      label: 'fieldset',
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
