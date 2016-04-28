$('document').ready(function () {
    var result = {},
        totalArrayToDisplay = [],
        table1,
        table2;

    $(".date").datepicker({
        format: 'dd/mm/yy'
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });

    $.fn.serializeObject = function () {
        var finalArray = this.serializeArray();
        for (var i = 0; i < finalArray.length; i++) {
            result[finalArray[i].name] = finalArray[i].value;
        }
    };

    checkDupes = function () {
        var lastElementIndex = totalArrayToDisplay.length - 1;
        for (var i = 0, len = totalArrayToDisplay.length; i < len; i++) {
            if (totalArrayToDisplay[i][1] == result.fakturanr) {
                $("#dialog1").attr("title", "Dupe").dialog();
                totalArrayToDisplay.splice(lastElementIndex, 1);
            }
        }
    };

    function Debtor(faktnr, belop, rente, dato, farfallsdato, inkassovarsel, farInkas) {
        this.fordrHaver = "Olsen Rer";
        this.faktnr = faktnr || "No data provided";
        this.skyldner = "Hodeland lys AS";
        this.belop = belop || "No data provided";
        this.rente = rente || "No data provided";
        this.delete = "";
        this.dato = dato || "No data provided";
        this.farfallsdato = farfallsdato || "No data provided";
        this.inkassovarsel = inkassovarsel || "No data provided";
        this.farInkas = farInkas || "No data provided";
    }

    $('.form-horizontal').validate({
        rules: {
            dato: {
                required: true,
                pattern: /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/
            },
            farfallsdato: {
                required: true,
                pattern: /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/
            },
            inkassovarsel: {
                required: true,
                pattern: /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/
            },
            farinkas: {
                required: true,
                pattern: /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/
            },
            fakturanr: {
                required: false,
                pattern: /^[0-9]{8,10}$/
            },
            belop: {
                required: true,
                pattern: /^\d+(\.\d{1,2})?$/
            },
            valuta: {
                required: true
            },
            kravet: {
                required: false
            },
            rentesats: {
                required: true
            }
        },
        messages: {
            dato: {
                pattern: "Correct format: dd/mm/yy"
            },
            farfallsdato: {
                pattern: "Correct format: dd/mm/yy"
            },
            inkassovarsel: {
                pattern: "Correct format: dd/mm/yy"
            },
            farinkas: {
                pattern: "Correct format: dd/mm/yy"
            },
            fakturanr: {
                pattern: "Correct format: 8-10 numbers"
            },
            belop: {
                pattern: "Correct format eg. 345.78"
            }
        },
        highlight: function (element) {
            $(element).closest('.wrapper').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.wrapper').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.wrapper').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $('.form-horizontal').submit(function () {

        if ($('.form-horizontal').valid()) {
            if ($.fn.dataTable.isDataTable('#table1')) {
                table1.destroy();
            }

            ($('.form-horizontal').serializeObject());

            var myFinalObject = new Debtor(
                result.fakturanr,
                result.belop,
                result.rentesats,
                result.dato,
                result.farfallsdato,
                result.inkassovarsel,
                result.farinkas),

                arrayToDisplay = [];

            for (key in myFinalObject) {
                if (myFinalObject.hasOwnProperty(key)) {
                    var value = myFinalObject[key];
                    arrayToDisplay.push(value);
                }
            }
            checkDupes();
            totalArrayToDisplay.push(arrayToDisplay);

            table1 = $('#table1').DataTable({
                data: totalArrayToDisplay,
                "aLengthMenu": [[5, 10, 25, 50, 75, -1], [5, 10, 25, 50, 75, "All"]],
                "iDisplayLength": 5,
                columns: [
                    {title: "Fordr.haver", "width": "15%"},
                    {title: "Faktnr/kto.nr", "width": "15%"},
                    {title: "Skyldner", "width": "25%"},
                    {title: "Belop", "width": "15%"},
                    {title: "Rente", "width": "20%"},
                    {title: "Delete", "width": "10%", "defaultContent": "<div id='del'></div>", render: function () {}}
                ]
            });

            $('tr>td>#del').on('click', function () {
                var theRaw = $(this.closest('tr'));
                var rowindex = $(this).closest("tr").index();
                totalArrayToDisplay.splice(rowindex, 1);
                theRaw.remove();
            });

            $('#table1 tbody').on('click', 'tr', function () {
                var rowindex = $(this).closest("tr").index();
                var datesArray = [];
                datesArray.push(totalArrayToDisplay[rowindex]);

                if ($.fn.dataTable.isDataTable('#table2')) {
                    table2.destroy();
                }

                table2 = $('#table2').DataTable({
                    bFilter: false,
                    bInfo: false,
                    paging: false,
                    data: datesArray,
                    columns: [
                        {title: "Fordr.haver", "visible": false, "defaultContent": "No data provided"},
                        {title: "Faktnr/kto.nr", "visible": false, "defaultContent": "No data provided"},
                        {title: "Skyldner", "visible": false, "defaultContent": "No data provided"},
                        {title: "Belop", "visible": false, "defaultContent": "No data provided"},
                        {title: "Rente", "visible": false, "defaultContent": "No data provided"},
                        {
                            title: "Delete",
                            "visible": false,
                            "defaultContent": "<div id='del'></div>",
                            render: function () {
                            }
                        },
                        {title: "Dato"},
                        {title: "Farfallsdato"},
                        {title: "Inkassovarsel"},
                        {title: "Inkassovarsel-Farfallsdato"}
                    ]
                });

                $("#dialog").attr('title', 'Dates').dialog();

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table1.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
            return false;
        }
        else {
            return;
        }
    });

});

