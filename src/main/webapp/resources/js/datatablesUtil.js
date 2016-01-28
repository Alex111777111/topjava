function makeEditable() {

    $('#add').click(function () {
        $('#id').val(0);
        $('#editRow').modal();
    });

    $('#filter').submit(function () {
        console.log('filtrer1');
        var form = $('#filter');
        debugger;
        $.ajax({
            url: ajaxUrl + "filter",
            type: 'POST',
            data: form.serialize(),
            success: function (data) {
                oTable_datatable.clear();
                $.each(data, function (key, item) {
                    oTable_datatable.row.add(item);
                });
                oTable_datatable.draw();
                successNoty('Filtered');
            }
        });
        return false;
    });

    $('.delete').click(function () {
        var idd = $(this).parent().parent().attr('id');
        console.log(idd);
        deleteRow(idd);
    });

    $('#detailsForm').submit(function () {
        save();
        return false;
    });

    $(document).ajaxError(function (event, jqXHR, options, jsExc) {
        failNoty(event, jqXHR, options, jsExc);
    });
}

function deleteRow(id) {
    $.ajax({
        url: ajaxUrl + id,
        type: 'DELETE',
        success: function () {
            updateTable();
            successNoty('Deleted');
        }
    });
}

function updateTable() {
    $.get(ajaxUrl, function (data) {
        oTable_datatable.clear();
        $.each(data, function (key, item) {
            oTable_datatable.row.add(item);
        });
        oTable_datatable.draw();
    });
}

function save() {
    var form = $('#detailsForm');
    debugger;
    $.ajax({
        type: "POST",
        url: ajaxUrl,
        data: form.serialize(),
        success: function () {
            $('#editRow').modal('hide');
            updateTable();
            successNoty('Saved');
        }
    });
}

var failedNote;

function closeNoty() {
    if (failedNote) {
        failedNote.close();
        failedNote = undefined;
    }
}

function successNoty(text) {
    closeNoty();
    noty({
        text: text,
        type: 'success',
        layout: 'bottomRight',
        timeout: true
    });
}

function failNoty(event, jqXHR, options, jsExc) {
    closeNoty();
    failedNote = noty({
        text: 'Failed: ' + jqXHR.statusText + "<br>",
        type: 'error',
        layout: 'bottomRight'
    });
}
