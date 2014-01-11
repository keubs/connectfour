c4.renderChip = function(col, row){
    var column = $('.column')[col];
    var row = $(column).find('.row')[row];
    $(row).addClass(game.player);
}

c4.updateLabels = function(){
    $('#player').html(game.player);
    $('#moves').html(game.moves);
}
