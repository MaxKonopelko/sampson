function loadCatalogCategory2(categoryId) {
    routeOnPageLoad('/Home/ViewDeclarationCategory/?id=' + categoryId, 'Каталог');

    var sectionId;
    if (categoryId < 3)
        sectionId = 1;
    if (categoryId >= 3)
        sectionId = 2;

    $.ajax({
        url: '../Catalog/?id=' + sectionId,
        success: function (data) {
            $('.container').html(data);
            viewDeclarationCategory();
        }
    });

    function viewDeclarationCategory() {
        $.ajax({
            url: '/Home/ViewDeclarationCategory/?id=' + categoryId,
            success: function (data) {
                $('.content').html(data).children().hide();
                setTimeout(function () {
                    gif(0);
                    $('.content').children().fadeIn();
                }, 150)
            }
        });
    }
}

function loadCatalog2(sectionId) {
    gif(1);
    $('.container').children().hide();
    if ($('div').is('.content') == false) {   //С главной страницы
        $.ajax({
            url: '../Catalog/?id=' + sectionId,
            success: function (data) {
                $('.container').html(data);
                viewDeclaration();
            }
        });
    }
    else   //Переключение внутри каталога
        $(".container").load('../Catalog/?id=' + sectionId + "#under", function (response, status, xhr) {
            if (status == "success")
                viewDeclaration();
        });

    function viewDeclaration() {
        $.ajax({
            url: '../ViewDeclaration/?id=' + sectionId,
            success: function (data) {
                $('.content').html(data).children().hide();
                setTimeout(function () {
                    gif(0);
                    $('.content').children().fadeIn();
                }, 150)
            }
        });
    }
}

function gif(c) {
    if (c == 1)
        $('.container_gif').append('<img id="gif" src="/Files/Images/Gif/gif.gif" />');
    else
        $('#gif').remove();
}