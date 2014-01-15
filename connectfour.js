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

    var v = false;
    v = checkVertical(x,y);
    var h = false;
    h = checkHorizontal(x,y);
    var d = false;
    d1 = checkDiagonalNESW(x,y);
    d2 = checkDiagonalNWSE(x,y)
    if(v==true||h==true||d1===true||d2===true) {
        console.log("win is by player " + game.player)
        c4.showWinMessage(player);
    } else {
        c4.playerToggle();
        c4.updateLabels();
    }

    // Check the 3 chips below your current chip and if they all match, booya.
    function checkVertical(x, y) {

        //may as well check if it's tall enough first
        if(y<game.ptw-1) {
            return false
        } else {
            // We don't need to check pieces up, pieces drop in from above
            for(var i=1;i<game.ptw+1;i++){
                if(i==game.ptw) {
                    console.log("win recorded at " + x + ", " + y + ". Counter at " + i);
                    return true;
                }
                if(board[x][y-i] == game.player) {
                    continue;
                } else {
                    break;
                }
            }
        }
        return false;
    }


    // Counts the amount of east/west chips the same as the current chip
    function checkHorizontal(x, y) {
        try {
            // West
            var counter = 1;
            for(var i = 1; i < game.ptw; i++) {
                if(isInBounds(x-i,y)) {
                    if(board[x-i][y] == game.player) {
                        counter++;
                        continue;
                    }
                    else {
                        break;
                    }
                }
            }
            if(counter>=game.ptw) { console.log("win recorded at " + x + ", " + y + ". Counter at " + counter); return true; }

            // East
            for(var i = 1; i < game.ptw; i++) {
                if(isInBounds(x+i,y)) {
                    if(board[x+i][y] == game.player) {
                        counter++;
                    }
                    else {
                        break;
                    }
                }
            }
            if(counter>=game.ptw) { console.log("win recorded at " + x + ", " + y + ". Counter at " + counter); return true; }
            return false;
        } catch (err) {
        }
    }


    // builds a count of chips on if the northwest/southwest/northeast/southeast chip is the same as the dropped chip
    // @todo eliminate the possibility of two southwest chips and one southeast chip indicating a win
    //northwest-southeast
    function checkDiagonalNWSE(x,y) {
        var counter = 1;
        // northwest
        for(var i = 1; i < game.ptw; i++) {
            if(isInBounds(x-i,y+i)) {
                if(board[x-i][y+i] == game.player) {
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
        if(counter>=game.ptw) { console.log("win recorded at " + x + ", " + y); return true; }

        // southeast
        for(var i = 1; i < game.ptw; i++) {
            if(counter>=game.ptw)
                return true;
            if(isInBounds(x+i,y-i)) {
                if(board[x+i][y-i] == game.player) {
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

        if(counter>=game.ptw) { console.log("win recorded at " + x + ", " + y); return true; }
    }
    function checkDiagonalNESW(x,y) {
        var counter = 1;
        // southwest
        for(var i = 1; i < game.ptw; i++) {
            if(isInBounds(x-i,y-i)) {
                if(board[x-i][y-i] == game.player) {
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
        if(counter>=game.ptw) { console.log("win recorded at " + x + ", " + y); return true; }

        // northeast
        for(var i = 1; i < game.ptw; i++) {
            if(isInBounds(x+i,y+i)) {
                if(board[x+i][y+i] == game.player) {
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
    return false;
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
