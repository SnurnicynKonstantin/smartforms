$(function () {
  $('.select-example').change(function () {
    $('.modal-container').hide();
    var el = $('.well form');
    var type = $(this).val();

    $.get('forms/' + type + '.json', function (data) {
      window.form = smartforms.createForm(el, data);
    });
  });

  $('.select-example').change();

  $('.modal-btn').click(function () {
    $.get('forms/modal.json', function (data) {
      window.modal = smartforms.createModal($('.modal'), data);
      $('.modal').modal('show');
    });
  });
});
