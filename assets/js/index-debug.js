
function actionButtons() {

    $('.rigth a').off().on('click', function(e){
        e.preventDefault();
        $('.content').addClass('show-chat');
    });

    $('.left a').off().on('click', function(e){
        e.preventDefault();
        $('.content').removeClass('show-chat');
    });

}




actionButtons();