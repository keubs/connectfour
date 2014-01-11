var c4 = {};
var board = [];
var game = {};
game.moves = 0;
game.player = 'red';

c4.init = function() {
    game.x = 7;
    game.y = 6;

    for(var i = 0; i < game.x; i++) {
        var x = [];
        board[i] = x;
    }
    return board;
}

c4.interact = function(){
    var board = c4.init();
    var $column = $('.column');

    var index;
    $column.bind('click', function(e){
        e.preventDefault();
        index = $(this).index();

        var square = c4.dropChip(board, index);
        // @todo move to a function: update labels
        if(square !== undefined){
            console.log(square);
            c4.playerToggle();
            c4.renderChip(index, square);
            c4.updateLabels();
        }

    });
}

c4.dropChip = function(board, index) {
    if(board[index].length>=game.y)
        return;
    else {
        board[index].push(game.player);
        var length = board[index].length-1;
    }
    return length;
}

c4.playerToggle = function () {
    if(game.moves%2==0){
        game.player = 'red';
    } else {
        game.player = 'blue';
    }
    game.moves++;
}

c4.scanBoard = function(){
    // FIFO -> LIFO
    var newBoard = [];

    for(var i = 0; i < board.length-1; i++) {
        newBoard[i] = board[i].reverse();
    }
    console.log(newBoard);
}
