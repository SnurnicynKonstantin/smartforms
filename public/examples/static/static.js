// Some code to test out lib
$(function () {
  var el = $('.smartform-with-static');

  var form = smartforms.createForm(el, {
    cls: 'form',
    items: [{
      block: 'static',
      name: 'sum',
      label: 'Сумма',
      value: 563,
      cls: 'input-money',
      rightMark: '<span class="glyphicon glyphicon-ruble" aria-hidden="true" style="font-size: 11px"></span>'
    }]
  });

});
