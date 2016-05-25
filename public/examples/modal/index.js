$(function () {
  $('.btn').on('click', function () {
    smartforms.createModal($('.modal'), {
      block: 'modal',
      title: 'Интернет Я.ru (Омские Кабельные Сети)',
      imgUrl: 'https://vp.ru/pay/resources/media/images/provider/logo/oks_inet.jpg',
      body: [{
        block: 'input',
        type: 'text',
        label: 'Лицевой счет'
      }, {
        block: 'input',
        type: 'text',
        label: 'Сумма'
      }],
      footer: [{
        block: 'checkbox',
        checkboxCls: 'iagree',
        cls: 'vp-dialog-control',
        name: 'iagree',
        checked: true,
        htmlLabel: 'Я соглашаюсь с <a href="/legal-information/docs/" target="_blank">условиями</a> договора-оферты'
      }, {
        block: 'button',
        type: 'submit',
        label: 'Submit'
      }]
    });

    $('.modal').modal('show');
  });
});
