// Some code to test out lib
$(function () {
  var el = $('.smartform');

  var form = smartforms.createForm(el, {
    cls: 'form',
    items: [{
      block: 'input',
      type: 'text',
      name: 'name',
      label: 'Имя',
      placeholder: 'Введите имя',
      suppressLabel: true
    }, {
      block: 'date',
      name: 'date',
      value: '14.09.2016',
      label: 'Дата снятия показаний'
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
