$('document').ready(function () {
    var result = {};
    var totalArrayToDisplay = [];
    var table;
    var table1;

    $(".datepicker").datepicker({
        format: 'dd/mm/yy'

    });

    $.fn.serializeObject = function () {
        var finalArray = this.serializeArray();
        for (var i = 0; i < finalArray.length; i++) {
            result[finalArray[i].name] = finalArray[i].value;
        }
    };

    function Debtor(Faktnr, Belop, Rente, Dato, Farfallsdato, Inkassovarsel, FarInkas) {
        this.FordrHaver = "Olsen Rer";
        this.Faktnr = Faktnr || "No data provided";
        this.Skyldner = "Hodeland lys AS";
        this.Belop = Belop || "No data provided";
        this.Rente = Rente || "No data provided";
        this.Delete = "";
        this.Dato = Dato || "No data provided";
        this.Farfallsdato = Farfallsdato || "No data provided";
        this.Inkassovarsel = Inkassovarsel || "No data provided";
        this.FarInkas = FarInkas || "No data provided";
    }

    $('.form-horizontal').submit(function created() {

        if ($.fn.dataTable.isDataTable('#example')) {
            table.destroy();
        }

        ($('.form-horizontal').serializeObject());
        var myFinalObject = new Debtor(result.fakturanr, result.belop, result.rentesats, result.dato, result.farfallsdato, result.inkassovarsel, result.farinkas);
        var arrayToDisplay = [];
        for (key in myFinalObject) {
            if (myFinalObject.hasOwnProperty(key)) {
                var value = myFinalObject[key];
                arrayToDisplay.push(value);
            }
        }
        totalArrayToDisplay.push(arrayToDisplay);
        table = $('#example').DataTable({
            data: totalArrayToDisplay,
            columns: [
                {title: "Fordr.haver"},
                {title: "Faktnr/kto.nr"},
                {title: "Skyldner"},
                {title: "Belop"},
                {title: "Rente"},
                {
                    title: "Delete", "defaultContent": "<div id='del'></div>", render: function () {
                }
                }
            ]
        });

        $('tr>td>#del').on('click', function () {
            var theRaw = $(this.closest('tr'));
            var rowindex = $(this).closest("tr").index();
            delete totalArrayToDisplay[rowindex];
            theRaw.remove();

            //table.data();
            //if(totalArrayToDisplay == 0){table.destroy();}
            //table.clear();           // clear all the rows ( not really necessary since we call empty() at the end)
            //table.destroy();              // remove table enhancements

        });

        $('#example tbody').on('click', 'tr', function () {
            var rowindex = $(this).closest("tr").index();
            var datesArray = [];
            datesArray.push(totalArrayToDisplay[rowindex]);

            if ($.fn.dataTable.isDataTable('#example1')) {
                table1.destroy();
            }

            table1 = $('#example1').DataTable({
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

            $("#dialog").dialog();

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        return false;
    });
});

