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
