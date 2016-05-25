// Some code to test out lib
$(function () {
  var el = $('.smartform-with-checkbox');

  smartforms.createForm(el, {
    cls: 'form form-horizontal',
    items: [{
      block: 'checkbox',
      name: 'iagree',
      checked: true,
      htmlLabel: 'Я соглашаюсь с <a href="/legal-information/docs/" target="_blank">условиями</a> договора-оферты'
    }]
  });
});
