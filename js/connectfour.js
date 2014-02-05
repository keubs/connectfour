var c4 = {};
var board = [];
var game = {};
game.moves = 0;
game.player = 0;
game.ptw = 4 // "pieces to win"

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

    c4.chipActions($column);
}

c4.dropChip = function(board, index) {

    if(board[index].length>=game.y)
        return;
    else {
        board[index].push(game.player);
        var length = board[index].length-1;
    }
    game.moves++;
    return length;
}

c4.playerToggle = function () {
    if(game.player===0)
        game.player=1;
    else
        game.player=0;
}

c4.scanBoard = function(x, y, player){

    var move = false;
    move = c4.checkRange(x, y);

    if(move) {
        console.log("win is by player " + game.player);
        c4.win();
    } else {
        c4.playerToggle();
        c4.updateLabels();
    }
}

c4.checkRange = function (x, y) {


    // north+ south- east+ west-
    var v = {};
    v.evalString = "x, y-i";
    v.boardEval = "board[x][y-i]";


    var he = {};
    he.evalString = "x+i, y";
    he.boardEval = "board[x+i][y]";


    var hw = {};
    hw.evalString = "x-i, y";
    hw.boardEval = "board[x-i][y]";

    var ne = {};
    ne.evalString = "x+i, y+i";
    ne.boardEval = "board[x+i][y+i]";

    var nw = {};
    nw.evalString = "x+i, y-i";
    nw.boardEval = "board[x+i][y-i]";

    var sw = {};
    sw.evalString = "x-i, y-i";
    sw.boardEval = "board[x-i][y-i]";

    var se = {};
    se.evalString = "x-i, y+i";
    se.boardEval = "board[x-i][y+i]";


    var horizontalWin = inARow(he) + inARow(hw, 0);
    var verticalWin = inARow(v);
    var diagonalWin1 = inARow(ne) + inARow(sw, 0);
    var diagonalWin2 = inARow(nw) + inARow(se, 0);

    if(horizontalWin==game.ptw || verticalWin == game.ptw || diagonalWin1 == game.ptw || diagonalWin2 == game.ptw) {
        return true;
    } else {
        return false;
    }

    function inARow(obj, count) {
        var counter = count;
        if(count===undefined)
            counter = 1;
        for(var i = 1; i < game.ptw; i++) {

            if(eval("isInBounds("+obj.evalString+")")) {
                if(eval(obj.boardEval) == game.player) {
                    counter++;
                    continue;
                }
                else {
                    break;
                }
            } else {
                break;
            }
        }
        return counter;
    }
}
// Check that reference cell of the board exists
function isInBounds(x, y) {
    try {
        if(board[x][y]!==undefined) {
            return true;
        }
        else {
            return false;
        }
    } catch(ex) {
        return false;
    }
}

c4.reset = function() {
    board = [];
    $('.row').each(function(){
        $(this).removeClass('red');
        $(this).removeClass('blue');
    });

    c4.moves = 0;
    c4.init();
}

c4.win = function (){
    c4.showWinMessage(game.player);
    document.getElementById('tada').play();
}
