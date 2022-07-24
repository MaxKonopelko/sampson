function loadCatalogCategory(categoryId) {
    routeOnPageLoad('/Home/ViewDeclarationCategory/?id=' + categoryId, 'Каталог');
    gif(1);
    if ($('div').is('.content') == false) {
        $("#footer_content").load('/Home/Catalog #foot_content_id', function (response, status, xhr) {
            if (status == "success")
                viewDeclarationCategory();
        });
    }
    else
        viewDeclarationCategory();

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