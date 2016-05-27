// Some code to test out lib
(function () {
  var el = $('.smartform-with-text');

  var form = smartforms.createForm(el, {
    cls: 'form',
    items: [{
      block: 'text',
      name: 'accountNumber',
      label: 'Лицевой счёт',
      mask: '9999 9999999',
      maskPlaceholder: '_',
      value: '1234 56789123',
      rightMark: '<span class="glyphicon glyphicon-ruble" aria-hidden="true" style="font-size: 11px"></span>'
    }]
  });

})();
