var c4 = {};
var board = [];
var game = {};
game.moves = 0;
game.player = 0;

c4.init = function() {
    game.x = 7;
    game.y = 6;

    for(var i = 0; i < game.x; i++) {
        var x = [];
        board[i] = x;
    }
}

c4.interact = function(){
    c4.init();
    var $column = $('.column');

    var index;
    $column.bind('click', function(e){
        e.preventDefault();
        index = $(this).index();

        var square = c4.dropChip(board, index);
        // @todo move to a function: update labels
        if(square !== undefined){
            c4.renderChip(index, square, game.player);
            c4.scanBoard(index, square);
            c4.playerToggle();
            c4.updateLabels();
            //c4.scanBoard(index, square);
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
    if(game.player===0)
        game.player=1;
    else
        game.player=0;
}

c4.scanBoard = function(x, y){
    // FIFO -> LIFO
    var newBoard = [];
    for(var i = 0; i < board.length-1; i++) {
        newBoard[i] = board[i].reverse();
    }


    checkVertical(x,y);
    function checkVertical(x, y) {
        if(y<3)
            return;
        else {
            for(var i = 0; i < 4; i++){
                console.log(board[x][i]);
            }
        }
    }
}


// Randomly add chips. @todo move to test class
c4.test = function() {
    for(var z = 0; z < 30; z++ ){
        var randex = Math.floor((Math.random()*7));
        var square = c4.dropChip(board, randex);
        if(square !== undefined){
            c4.renderChip(randex, square, game.player);
            c4.playerToggle();
            c4.updateLabels();
        }
    }
}
