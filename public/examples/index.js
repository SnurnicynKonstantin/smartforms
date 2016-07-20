$(function () {
  $('.select-example').change(function () {
    $('.modal-container').hide();
    var el = $('.well form');
    var type = $(this).val();

    $.get('forms/' + type + '.json', function (data) {
      window.form = smartforms.createForm(el, data);
    });
  }).change();

  var providerTemplate = function (provider) {
    return '<tr class="provider" data-json-path="' + provider.path + '">' +
             '<td class="modal-initial-button"><a href="#">' + provider.name + '</a></td>' +
             '<td class="modal-column">' +
               '<div class="modal"></div>' +
             '</td>' +
           '</tr>';
  };

  var $providersContainer = $('#providers tbody');

  [
    { path: 'forms/modal.json', name: 'ОКС' },
    { path: 'forms/fines_modal.json', name: 'Оплата штрафов ГИБДД' },
    { path: 'forms/registration.json', name: 'Регистрация' },
    { path: 'forms/vp/zhilremservice.json', name: 'ООО «Жилремсервис», ИНН 7017095356' },
    { path: 'forms/vp/ukmoydomtomsk.json', name: 'ООО УК «Мой дом», ИНН 7017177224' },
    { path: 'forms/vp/jekzhilischnik710.json', name: 'ООО «ЖЭК-Жилищник», ИНН 7017363710' },
    { path: 'forms/vp/tsjvenera.json', name: 'ТСЖ «Венера», ИНН 7017147251' },
    { path: 'forms/vp/mkstomsk.json', name: 'ЗАО «МКС-Томск», ИНН 7017276320' },
    { path: 'forms/vp/tsjaruna.json', name: 'ТСЖ «АрунА», ИНН 7017157997' },
    { path: 'forms/vp/TochkaSpa.json', name: 'ООО «ТОЧКА СПА»' },
    { path: 'forms/vp/himikkaprem.json', name: 'ТСЖ «Химик» Капремонт, ИНН 7017221360' },
    { path: 'forms/vp/himik.json', name: 'ТСЖ «Химик», ИНН 7017221360' },
    { path: 'forms/vp/argus_sever.json', name: 'ООО «ЧОП «Аргус-Север», ИНН 7017055963' },
    { path: 'forms/vp/govorova.json', name: 'ТСЖ «Говорова 26, 28», ИНН 7017125850' },
    { path: 'forms/vp/govorovakaprem.json', name: 'ТСЖ «Говорова 26, 28» Капремонт, ИНН 7017125850' },
    { path: 'forms/vp/tomtel.json', name: 'ООО «ТОМТЕЛ»' },
    { path: 'forms/vp/beeline.json', name: 'Билайн, сотовая связь' },
    { path: 'forms/vp/tomica.json', name: 'Агентство ТОМИКА' },
    { path: 'forms/vp/ukmayak.json', name: 'ООО «Маякъ»' },
    { path: 'forms/vp/sibtelesystem.json', name: 'ООО «Сибирские Телесистемы»' },
    { path: 'forms/vp/uknashdom.json', name: 'ООО «УК «Наш дом», ИНН 7014044716' },
    { path: 'forms/vp/modelnet.json', name: 'Model.Net (ООО «Модэл»)' },
    { path: 'forms/vp/vozminet.json', name: 'Vozmi.Net (ООО «Модэл»)' },
    { path: 'forms/vp/kapremtomsk.json', name: '«Региональный фонд капитального ремонта многоквартирных домов Томской области» (РФКР МКД ТО)' },
    { path: 'forms/vp/oootomica.json', name: 'ООО «Томика»' },
    { path: 'forms/vp/mvdtomsk.json', name: '«ОВО по г. Томску – филиал ФГКУ УВО УМВД России по Томской области»' },
    { path: 'forms/vp/newtelesystem.json', name: 'ООО «Новые Телесистемы-ТВ»' },
    { path: 'forms/vp/tomteltv.json', name: 'ООО «Томсктелесети» Кабельное ТВ, г. Томск' },
    { path: 'forms/vp/tomtelinet.json', name: 'ООО «Томсктелесети» Интернет, г. Томск' },
    { path: 'forms/vp/ukzhilfond.json', name: 'ООО «УК «ЖилФонд», ИНН 7017110830' },
    { path: 'forms/vp/erdomrutomsk.json', name: 'ДОМ.RU, Интернет, Томская обл.' },
    { path: 'forms/vp/jilservice047.json', name: 'ООО «Жилсервис «Ленинский», ИНН 7017148047' },
    { path: 'forms/vp/jilservice690.json', name: 'ООО «Компания Жилсервис «Каштак», ИНН7017157690' },
    { path: 'forms/vp/ergorsvyaztomsk.json', name: 'ДОМ.RU, Телефония, Томская обл.' },
    { path: 'forms/vp/erdivantvtomsk.json', name: 'ДОМ.RU, Кабельное ТВ, Томская обл.' },
    { path: 'forms/vp/tdskuyut.json', name: 'ЗАО «Уют ТДСК», ИНН 7017004711' },
    { path: 'forms/vp/gazpromtomsk.json', name: 'ОАО «Газпром межрегионгаз Новосибирск» Филиал в Томской области' },
    { path: 'forms/vp/iceberg.json', name: 'ООО ЧОП «Айсберг», ИНН 7017049705' },
    { path: 'forms/vp/tsjluxemburg.json', name: 'ТСЖ «Люксембург», ИНН 7017233415' },
    { path: 'forms/vp/tsjubileynoe.json', name: 'ТСЖ «Юбилейное», г.Томск, ИНН 7017293661' },
    { path: 'forms/vp/krepost.json', name: 'Сервисный центр «Крепость»' },
    { path: 'forms/vp/uksoyuz.json', name: 'ООО «УК «Союз»' },
    { path: 'forms/vp/alfama.json', name: 'ООО «АЛФАМА» (интернет-магазин INTERSOUND), ИНН 7017329188' },
    { path: 'forms/vp/ukkirovskij_massiv.json', name: 'ООО «УК «Кировс​кий Массив»' },
    { path: 'forms/vp/departamentohrany.json', name: 'ООО ЧОО «Департамент охраны»' },
    { path: 'forms/vp/patriott.json', name: 'ООО ЧОП «Патриот-Т»' },
    { path: 'forms/vp/domservicetdsk.json', name: 'ООО «Дом-Сервис ТДСК»' },
    { path: 'forms/vp/ukstrojsojuz.json', name: 'ООО «УК СТРОЙСОЮЗ»' },
    { path: 'forms/vp/jilservice497.json', name: 'ООО «Компания Жилсервис», ИНН7017208497' },
    { path: 'forms/vp/iceberg_servis.json', name: 'ООО ЧОП «АЙСБЕРГ-СЕРВИС», ИНН 7017189660' },
    { path: 'forms/vp/uknewage.json', name: 'ООО «УК Новый Век», ИНН 7017344330' },
    { path: 'forms/vp/jilservice520.json', name: 'ООО «Жилсервис», ИНН 7017070520' },
    { path: 'forms/vp/jek30.json', name: 'ООО «ЖЭК №30», ИНН 7017113206' },
    { path: 'forms/vp/ukistochnoye.json', name: 'ООО «Управляющая компания «Источное», ИНН 7017120796' },
    { path: 'forms/vp/jilservice472.json', name: 'ООО «Жилсервис «Черемошники», ИНН 7017208472' }
  ].forEach(function (provider) {
    $providersContainer.append(providerTemplate(provider));
  });

  $providersContainer.on('click', '.modal-initial-button a', function (e) {
    e.preventDefault();

    var $provider = $(this.closest('tr.provider'));

    $.get($provider.data('jsonPath'), function (data) {
      window.modal = smartforms.createModal($provider.find('.modal-column .modal'), data);
      $provider.find('.modal-column .modal').modal('show');
    });
  });
});
