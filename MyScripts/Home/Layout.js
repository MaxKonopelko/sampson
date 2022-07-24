
if ($('div').is($('#container_id').children()) == false)  //загрузка Index при перезагрузке страницы
    knopkaClick(0);

/*
$('.knopka a').click(function () {
    //gif(0);
});

var ajx1, ajx2, check;

function ajaxBreak() {
    //ajx1.abort();
    if (check == 1) {
        ajx2.abort();
        gif(0);
        console.log(check)
        check = 0;
        console.log(check)
    }
    
};*/


function loadCatalog(sectionId) {
    routeOnPageLoad('/Home/ViewDeclaration/?id=' + sectionId, 'Каталог');
    gif(1);
    $('.container').children().hide();
    if ($('div').is('.content') == false) {   //С главной страницы
        ajx1 = $.ajax({
            url: '/Home/Catalog/?id=' + sectionId,
            success: function (data) {
                $('.container').html(data);
                viewDeclaration();
            }
        });
    }
    else   //Переключение внутри каталога
        $(".container").load('/Home/Catalog/?id=' + sectionId + "#under", function (response, status, xhr) {
            if (status == "success")
                viewDeclaration();
        });

    function viewDeclaration() {
        ajx2 = $.ajax({
            url: '/Home/ViewDeclaration/?id=' + sectionId,
            success: function (data) {
                /*check = 1;
                
                $('.knopka a').click(function () {
                    
                    ajaxBreak();
                });*/

                $('.content').html(data).children().hide();
                setTimeout(function () {
                    gif(0);
                    $('.content').children().fadeIn();
                }, 150)
            }
        });
    }
}

function knopkaClick(num) {
    $('.container').children().fadeOut();
    switch (num) {
        case 0:
            $(".container").load('/Home/Index').hide();
            setTimeout(function () {
                $('.container').fadeIn();
            }, 200)

            routeOnPageLoad('/Home', 'Главная');
            break;
        case 1:
            loadCatalog(2);
            break;
        case 2:
            $(".container").load('/Section/Discount').hide();
            setTimeout(function () {
                $('.container').fadeIn();
            }, 200)

            routeOnPageLoad('/Section/Discount', 'Акции');
            break;
        case 3:
            $(".container").load('/Section/Services').hide();
            setTimeout(function () {
                $('.container').fadeIn();
            }, 200)

            routeOnPageLoad('/Section/Services', 'Услуги');
            break;
        case 4:
            $(".container").load('/Section/History').hide();
            setTimeout(function () {
                $('.container').fadeIn();
            }, 200)

            routeOnPageLoad('/Section/History', 'О компании');
            break;
        case 5:
            $(".container").load('/Section/Partners').hide();
            setTimeout(function () {
                $('.container').fadeIn();
            }, 200)

            routeOnPageLoad('/Section/Partners', 'Партнерам');
            break;
        case 6:
            $(".container").load('/Section/Contacts').hide();
            setTimeout(function () {
                $('.container').fadeIn();
            }, 200)

            routeOnPageLoad('/Section/Contacts', 'Контакты');
            break;
    }
}

function gif(c) {
    if (c == 1)
        $('.container_gif').append('<img id="gif" src="/Files/Images/Gif/gif.gif" />');
    else
        $('#gif').remove();
}

$(window).load(function () {
    $('#fl1').flexslider({
        animation: "slide",
        slideshowSpeed: 6000,
        animationDuration: 2000,
    });

    $('#fl2').flexslider({
        slideshowSpeed: 7000,
        animationDuration: 1200,
    });
});