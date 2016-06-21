$(function () {
  function createAndShowModal(btnSel, jsonPath, modalSel) {
    $(btnSel).click(function () {
      $.get(jsonPath, function (data) {
        window.modal = smartforms.createModal($(modalSel), data);
        $(modalSel).modal('show');
      });
    });
  }

  $('.select-example').change(function () {
    $('.modal-container').hide();
    var el = $('.well form');
    var type = $(this).val();

    $.get('forms/' + type + '.json', function (data) {
      window.form = smartforms.createForm(el, data);
    });
  });

  $('.select-example').change();

  createAndShowModal('.modal-btn', 'forms/modal.json', '.ocn .modal');
  createAndShowModal('.modal-fines-btn', 'forms/fines_modal.json', '.modal-fines .modal');
});
