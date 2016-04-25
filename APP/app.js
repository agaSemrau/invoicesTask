$(function () {
    $(".datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    });
});

$.fn.serializeObject = function()
{
    var o = {FordrHaver: "Olsen Rer"};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
var finalArray=[];
$(function() {
    $('.form-horizontal').submit(function () {
        var finalObject = ($('.form-horizontal').serializeObject());
        console.log(finalObject);
        finalArray.push(finalObject);
        console.log(finalArray);

        $('#example').DataTable( {
            data: finalArray,
            columns: [
                { title: "Fordr.haver" },
                { title: "Faktnr/kto.nr" },
                { title: "Skyldner" },
                { title: "Belop" },
                { title: "Rente" }
            ]
        } );


        return false;

    });

});



