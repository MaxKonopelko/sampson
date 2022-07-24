
function uploadImg(i, j) {
    var imgPath = $("#imgSpis-" + i + "-" + j).attr('src');
    $("#" + i + "").replaceWith("<img id='" + i + "' src='" + imgPath + "'/>");
    $('.photo #' + i + '').hide().fadeIn(300);
}

$('.container_forDeclaration').mouseover(function () {
    $(this).children().css({
        "position": "relative",
        "z-index": "999",
        "transition": ".5s"
    })
    $(this).children('div:first-child').css({
        "visibility": "visible",
        "position": "absolute",
        "z-index": "998",
        "width": "308px",
        "border": "1px solid #e3e3e3",
        "box-shadow": "0 0 7px rgba(140, 140, 140, 0.3)"
    })
});

$('.container_forDeclaration').mouseleave(function () {
    $(this).children().css({
        "z-index": "111",
        "transition": ".5s"
    })
    $(this).children('div:first-child').css({
        "visibility": "hidden",
        "z-index": "0",
        "width": "237px",
        "border": "1px solid #ffffff",
    })
})

$('.photo').click(function () {
    viewCurrent($(this).data("id-declaration"));
});

$('.container_forDeclaration a').click(function () {
    viewCurrent($(this).data("id-declaration"));
});

function viewCurrent(id) {
    routeOnPageLoad('/Home/ViewCurrentDeclaration/?id=' + id + '', 'Каталог');
    gif(1);
    $('#footer_content').children().fadeOut();
    $.ajax({
        url: '../ViewCurrentDeclaration/?id=' + id,
        success: function (data) {
            $('#footer_content').html(data);
        }
    })
}

//Срабатывает при перезагрузке
(function rebootPage() {
    if ($('div').is('.content') == false) {
        var url = window.location.href;
        var indexId = url.lastIndexOf('=');
        indexId++;

        $.getScript('/MyScripts/reboot-catalog-route.js', function () {
            if (~url.indexOf('ViewDeclarationCategory'))
                loadCatalogCategory2(url.substring(indexId));
            else
                if (~url.indexOf('ViewDeclaration'))
                    loadCatalog2(url.substring(indexId));
        })
    }
}())