// Some code to test out lib
$(function () {
    var el = $('.smartform');

    var form = new smartforms.Form(el, {
        formClasses: [
            "form",
            "form-horizontal"
        ],
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

    form.render();

    form.test();
});
