// Some code to test out lib
$(function () {
  var el = $('.smartform');

  smartforms.createForm(el, {
    cls: 'form',
    items: [{
      block: 'fieldset',
      label: 'Fieldset with layout',
      layout: [1, {count: 2, width: [3, 9]}, 3],
      name: 'fieldset0',
      items: [{
        block: 'input',
        label: 'test',
        disabled: true,
        placeholder: 'test0',
        name: 'test0'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test1',
        name: 'test1'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test2',
        name: 'test2'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test3',
        name: 'test3'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test4',
        name: 'test4'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test5',
        name: 'test5'
      }]
    }, {
      block: 'fieldset',
      label: 'Fieldset without layout',
      name: 'fieldset1',
      items: [{
        block: 'input',
        disabled: false,
        placeholder: 'test6',
        name: 'test6'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test7',
        name: 'test7'
      }, {
        block: 'input',
        disabled: false,
        placeholder: 'test8',
        name: 'test8'
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
