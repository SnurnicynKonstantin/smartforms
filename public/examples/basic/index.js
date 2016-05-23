// Some code to test out lib
$(function () {
    var el = $('.smartform');

    smartforms.createForm(el, {
        cls: 'form',
        items: [{
            block: 'input',
            type: 'text',
            name: 'name',
            label: 'Имя'
        }, {
            block: 'input',
            type: 'date',
            name: 'dob',
            label: 'Дата рождения'
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
