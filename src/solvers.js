/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  //I - 'n' # of rows & columns in board && # of rooks
  //O - an array of arrays with n rooks placed so none of them attack
  //C -
  //E - if n = 0
  var board = new Board({n: n});
  var solution = [];


  var row = 0;
  var col = 0;
  while (row < n && col < n) {
    if (board.hasAnyRooksConflicts() === false) {
      board.togglePiece(row, col);
    }
    row++;
    col++;
  }
  for (var key in board.changed) {
    solution.push(board.changed[key]);
  }
  // console.log('solution', solution);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//helper function that accepts coordinates check if solutions exist

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //I - n which is the row & column & n rooks
  //O - the number of nxn chessboards that exist
  var board = new Board({n: n});
  var solutionCount = 0;
  var rookCount = 0;

  //check one row
  var helper = function(row) {
    if (row === n) {
      return;
    }
    //test each square in the row
    for (var col = 0; col < n; col++) {
      //add piece
      board.togglePiece(row, col);

      //console.log(board.hasAnyRooksConflicts());
      if (!board.hasAnyRooksConflicts()) {
        rookCount++;
        if (rookCount === n) {
          solutionCount++;
        }
        //remove piece;
        helper(row + 1);
        rookCount--;
      }

      board.togglePiece(row, col);

    }
  };

  helper(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  //console.log(board);
  var solution = [];
  var queenCount = 0;

  var helper = function(row) {
    if (row === n) {
      return;
    }
    //test each square in the row
    for (var col = 0; col < n; col++) {
      //add piece
      //console.log('col', col);
      board.togglePiece(row, col);

      //console.log(board.hasAnyRooksConflicts());
      if (!board.hasAnyQueensConflicts()) {
        queenCount++;
        if (queenCount === n) {
          break;
        }
        //remove piece;
        helper(row + 1);
        queenCount--;
      }

      board.togglePiece(row, col);

    }
  };
  helper(0);

  for (var key in board.changed) {
    solution.push(board.changed[key]);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board ({n: n});
  console.log('board', board);
  var solutionCount = 0;
  var queenCount = 0;

  //check one row
  var helper = function(row) {
    if (row === n) {
      return;
    }
    //test each square in the row
    for (var col = 0; col < n; col++) {
      //add piece
      board.togglePiece(row, col);

      //console.log(board.hasAnyQueensConflicts());
      if (board.hasAnyQueensConflicts() === false) {
        queenCount++;
        if (queenCount === n) {
          solutionCount++;
        }
        //remove piece;
        helper(row + 1);
        queenCount--;
      }

      board.togglePiece(row, col);
    }
  };

  helper(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};