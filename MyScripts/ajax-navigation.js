
function routeOnPageLoad(url, contact) {
    window.history.pushState("ajax", document.title, url);
    document.title = contact;
    
    //$.validator.unobtrusive.parse($("#container_id"));
}

// Метод выполняется при загрузке документа
$(document).ready(function () {
    // Подписываемся на навигацию браузера по страницам
    window.onpopstate = function (event) { //срабатывает при нажатии вперед/назад
        if (event.state == "ajax")
            window.location.reload();
        else
            window.history.replaceState("ajax", document.title, window.location.href);
        event.preventDefault();//перезагрузить страницу
    };
    // Устанавливаем новый заголовок страницы
    //document.title = $("#pageUrl").data("title");
});