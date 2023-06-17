
let app_controller;

$.fn.scrollView = function () {
    
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 700);
    });
}

$(document).ready(function() {
    app_controller = new AppController();
    // Set Nav Button Events
    $('#teams_btn').click(() => {
        app_controller.render_teams_list();
        $('#view-display').scrollView();
    });

    $('#owners_btn').click(() => {
        app_controller.render_owners_list();
        $('#view-display').scrollView();
    });

});
