$('document').ready(function () {
    var arrayToDisplay=[];
    var totalArrayToDisplay = [];

    $(".datepicker").datepicker();
    var finalArray = [];
    var totalArray = [];

    $.fn.serializeObject = function () {
        finalArray = this.serializeArray();
        var result = {};
        for (var i=0; i<finalArray.length; i++) {
            result[finalArray[i].name] = finalArray[i].value;
        }

        var myFinalObject = {
            FordrHaver: "Olsen Rer",
            Faktnr: result.fakturanr,
            Skyldner: "Hodeland lys AS",
            Belop: result.belop,
            Rente: result.rentesats
        };

        for(key in myFinalObject) {
            if(myFinalObject.hasOwnProperty(key)) {
                var value= myFinalObject[key];
                arrayToDisplay.push(value);
            }
        }


        totalArrayToDisplay.push(arrayToDisplay)


        console.log (myFinalObject);
        console.log(arrayToDisplay);

        //$.each(finalArray, function () {
        //    if (o[this.name] !== undefined) {
        //        if (!o[this.name].push) {
        //            o[this.name] = [o[this.name]];
        //        }
        //        o[this.name].push(this.value || '');
        //    } else {
        //        o[this.name] = this.value || '';
        //    }

        //});


        //return o;
    };

    $(function () {
        $('.form-horizontal').submit(function () {
            ($('.form-horizontal').serializeObject());

            console.log(totalArrayToDisplay);

            //var valuesArray = finalArray.map(function (a) {
            //    return a.value;
            //});
            //totalArray.push(valuesArray);
            //console.log(totalArray);


            $('#example').DataTable({
                data: totalArrayToDisplay,
                columns: [
                    {title: "Fordr.haver",},
                    {title: "Faktnr/kto.nr"},
                    {title: "Skyldner"},
                    {title: "Belop"},
                    {title: "Rente"},
                    {title: "Delete"}
                ],
                //columnDefs: [
                //    {
                //        "targets": [ 2 ],
                //        "visible": false,
                //        "searchable": false
                //    },
                //    {
                //        "targets": [ 3 ],
                //        "visible": false
                //    }
                //]
            });

            return false;
        });

    });
});


