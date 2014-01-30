var c4t = {}

// Randomly add x-amount of chips to the board
c4t.randomTest = function(moves) {
    for(var z = 0; z < moves; z++ ){
        var randex = Math.floor((Math.random()*7));
        var square = c4.dropChip(board, randex);
        if(square !== undefined){
            c4.renderChip(randex, square, game.player);
            c4.scanBoard(randex, square, game.player);
        }
    }
}

// Testing for horizontal win on second row with center chip
c4t.horizontalTest = function () {
    //this should yield a red player win on the second row
    var columns = [0,1,2,4,3,5,3,6,6,0,4,1,4,2,5];
    c4t.runBatch(columns);


}
c4t.verticalTest = function() {
    // this should yield a blue player win on the 4th column from 2 rows up
    var columns = [2,1,0,4,1,2,1,3,1,6,1];

    c4t.runBatch(columns);
}

c4t.diagonalTestNWSE = function() {
    // this should yield a blue player winning diagonally from northwest to southeast
    var columns = [1,1,1,1,2,2,0,2,6,4,5,0,5,3,6,3];

    c4t.runBatch(columns);
}

c4t.diagonalTestNESW = function() {
    // this should yield a blue player winning diagonally from southwest to northeast
    var columns = [1,2,2,4,4,3,3,4,4,0,3];

    c4t.runBatch(columns);
}


// Runs batch of clicks based in hardcoded array
c4t.runBatch = function(columns) {

    for(var i =0; i < columns.length; i++){
        var index = columns[i];
        var square = c4.dropChip(board, index);
        if(square !==undefined){
            console.log("Chip Dropped at " + index + "," + square + " by " + c4.convertValue(game.player) + " player");
            c4.renderChip(index, square, game.player);
            c4.scanBoard(index, square);
        }
    }
}
