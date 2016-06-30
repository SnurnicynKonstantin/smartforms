$(function () {
  $('.select-example').change(function () {
    $('.modal-container').hide();
    var el = $('.well form');
    var type = $(this).val();

    $.get('forms/' + type + '.json', function (data) {
      window.form = smartforms.createForm(el, data);
    });
  }).change();

  $('#providers tr.provider').each(function(index, provider) {
    var $provider = $(provider);

    $provider.find('.modal-initial-button a').click(function (e) {
      e.preventDefault();
      $.get($provider.data('jsonPath'), function (data) {
        window.modal = smartforms.createModal($provider.find('.modal-column .modal'), data);
        $provider.find('.modal-column .modal').modal('show');
      });
    });
  });
});
