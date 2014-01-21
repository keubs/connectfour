function checkHorizontal(x,y) {
    var currentPlayer = game.player;
    try{
        // Drop the chip, check to the left
        var counter = 0;
        if(board[x-1][y]==currentPlayer) {
            counter++;
            if(board[x-2][y]==currentPlayer) {
                counter++;
                if(board[x-3][y]==currentPlayer) {
                    alert('win at ' + x+","+y);
                }
            }
        }

        // Drop the chip, check to the right
        if(board[x+1][y]==currentPlayer) {
            counter++;
            if(board[x+2][y]==currentPlayer) {
                counter++;
                if(board[x+3][y]==currentPlayer) {
                    alert('win at ' + x+","+y);
                }
            }
        }
        console.log(counter);
        if(counter>=4)
            alert('win at ' + x+","+y);
    } catch (err) {

    }
}
function checkVertical(x, y) {
    if(y<3)
        return;
    else {
        var output = '';
        for(var i = 0; i < 4; i++){
            if(board[x][i])
                output += (board[x][i].toString());
            if(output=='1111' || output == '0000') {
                alert('win at ' + x+","+y);
            }
            console.log(board[x][i].toString(),output);

        }
    }
}


//my old chip checker methods
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
