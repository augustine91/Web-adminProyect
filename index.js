$(document).ready(function() {
    $("#right").click(function(){
        var valor = $('#text').val();
        $('.list-right').append('<li class="list-group-item"><button class="btn" type="button">X</button></li>');
    });
  
    $("#left").click(function(){
        var valor = $('#text').val();
        $('.list-left').append('<li class="list-group-item"><button class="btn" type="button">X</button></li>');
    });

    $('.btn').click(function() {
        $('list-group-item').remove();
    });

});