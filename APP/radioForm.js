$(function () {
    $('radio').buttonset();
    $("[name='radio']").change(function () {
        if ($(this).attr('checkstate') == 'true') {
            $(this).attr('checked', false);
            $(this).attr('checkstate', 'false');
        } else {
            $(this).attr('checked', true);
            $(this).attr('checkstate', 'true');
        }

        if ($('#inkassovarselRadio').is(':checked') || $('#tvistesakRadio').is(':checked')) {
            $('.inkassosakRadio').addClass('hide');
            $('.construction').removeClass('hide');
        } else {
            $('.inkassosakRadio').removeClass('hide');
            $('.construction').addClass('hide');
        }
    });

});

