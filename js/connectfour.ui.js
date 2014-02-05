c4.renderChip = function(col, row, player){
    var column = $('.column')[col];
    var row = $(column).find('.c4row a')[row];
    $(row).addClass(c4.convertValue(player));
}

c4.updateLabels = function(){
    $('#player').html(c4.convertValue(game.player));
    $('#moves').html(game.moves);
}

c4.convertValue = function(val){
    if(val===0)
        return 'red';
    else
        return 'blue';
}

c4.showWinMessage = function (player) {
    $('#board').unbind('click');
    $('#playerlabel').fadeOut(function(){
        $('#playerlabel').html(c4.convertValue(player) + ' player wins!');
        $('#playerlabel').fadeIn();
    })
}
