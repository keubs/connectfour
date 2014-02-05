c4.chipActions = function($column) {
    var index;
    $column.bind('click', function(e){
        e.preventDefault();
        index = $(this).index();

        var square = c4.dropChip(board, index);
        // @todo move to a function: update labels
        if(square !== undefined){
            document.getElementById("chip").play();
            c4.renderChip(index, square, game.player);
            c4.scanBoard(index, square, game.player);
        }

    });
}
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
    $('.column').unbind('click');
    $('#playerlabel').fadeOut(function(){
        $('#playerlabel').html(c4.convertValue(player) + ' player wins!');
        $('#playerlabel').fadeIn();
    })
}
