$(document).ready(function(){
    $('.main_btna, .main_btn, nav>ul>li:eq(1)').on("click", function() {
        $('.overlay').show();
        $('.modal').slideDown();
    });
    $('.close').on("click", function() {
        $('.overlay').hide();
        $('.modal').slideUp();
    });
});