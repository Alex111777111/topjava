var ajaxUrl = 'ajax/profile/meals/';
var datatableApi;

$("input[id^='datepicker']").datetimepicker({
    timepicker:false,
    format:'Y-m-d',
    lang:'ru'
});

$("input[id^='timepicker']").datetimepicker({
    datepicker:false,
    format:'H:i',
    lang:'ru'
});

$('#datetimepicker').datetimepicker({
    format:'Y-m-d\\TH:i',
    lang:'ru'
});


function updateTable() {
    $.ajax({
        type: "POST",
        url: ajaxUrl + 'filter',
        data: $('#filter').serialize(),
        success: function (data) {
            updateTableByData(data);
        }
    });
    return false;
}

$(function () {
    datatableApi = $('#datatable').DataTable({
        "sAjaxSource": ajaxUrl,
        "sAjaxDataProp": "",
        "bPaginate": false,
        "bInfo": false,
        "aoColumns": [
            {
                "mData": "dateTime",
                "mRender": function (date, type, row) {
                    if (type == 'display') {
                        var dateObject = date.replace(/[T]/, " ");
                        return '<span>' + dateObject + '</span>';
                    }
                    return date;
                }
            },
            {
                "mData": "description"
            },
            {
                "mData": "calories"
            },
            {
                "sDefaultContent": "Edit",
                "bSortable": false,
                "mRender": renderEditBtn
            },
            {
                "sDefaultContent": "Delete",
                "bSortable": false,
                "mRender": renderDeleteBtn
            }
        ],
        "aaSorting": [
            [
                0,
                "desc"
            ]
        ],
        "createdRow": function (row, data, dataIndex) {
            data.exceed ? $(row).addClass('exceeded') : $(row).addClass('normal');
        },
        "initComplete": makeEditable
    });

    $('#filter').submit(function () {
        updateTable();
        return false;
    });
});

function init() {
}