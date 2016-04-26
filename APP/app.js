$('document').ready(function () {

    $(".datepicker").datepicker();
    var finalArray = [];
    var totalArray = [];

    $.fn.serializeObject = function () {
        finalArray = this.serializeArray();
        console.log(this.name);
        console.log(finalArray);

        $.each(finalArray, function () {
            console.log(this.name);
        })

        var result = {};
        for (var i=0; i<finalArray.length; i++) {
            result[finalArray[i].name] = finalArray[i].value;
        }



//result
        console.log(result);
        var fvnr = result.fakturanr;

        var myFinalObject = {
            FordrHaver: "Olsen Rer",
            Faktnr: fvnr,


        }
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

            var valuesArray = finalArray.map(function (a) {
                return a.value;
            });
            totalArray.push(valuesArray);
            console.log(totalArray);


            $('#example').DataTable({
                data: totalArray,
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


