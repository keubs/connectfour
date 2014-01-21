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

    var index;
    $column.bind('click', function(e){
        e.preventDefault();
        index = $(this).index();

        var square = c4.dropChip(board, index);
        // @todo move to a function: update labels
        if(square !== undefined){
            c4.renderChip(index, square, game.player);
            c4.scanBoard(index, square, game.player);
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
        console.log("win is by player " + game.player)
        c4.showWinMessage(player);
    } else {
        c4.playerToggle();
        c4.updateLabels();
    }
}

c4.checkRange = function (x, y) {

    var counter = 1;

    for(var i = 1; i < game.ptw; i++) {
        if(eval("isInBounds("+directions[1].evalString+")")) {
            if(eval(directions[0].boardEval) == game.player) {
                counter++;
                continue;
            }
            else {
                break;
            }
        }
    }
    if(counter>=game.ptw) { console.log("win recorded at " + x + ", " + y); return true; }


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

c4.directions = [];

// north+ south- east+ west-
var directions = [];
var v = {};
v.evalString = "x, y-i";
v.boardEval = "board[x][y-i]";
c4.directions["v"] = v; 


var he = {};
he.evalString = "x+i, y";
he.boardEval = "board[x+i][y]";
c4.directions["he"] = he;

var hw = {};
hw.evalString = "x-i, y";
hw.boardEval = "board[x-i][y]";
c4.directions["hw"] = hw;

var ne = {};
ne.evalString = "x+i, y+i";
ne.boardEval = "board[x+i][y+i]";
c4.directions["ne"] = ne;

var nw = {};
nw.evalString = "x+i, y-i";
nw.boardEval = "board[x+i][y-i]";
c4.directions["nw"] = nw;


var sw = {};
sw.evalString = "x-i, y-i";
sw.boardEval = "board[x-i][y-i]";
c4.directions["sw"] = sw;

var se = {};
se.evalString = "x-i, y+i";
se.boardEval = "board[x-i][y+i]";
c4.directions["se"] = se;
