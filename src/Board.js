// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // console.log('here', this.attributes[0]);
      // console.log('rowindex', rowIndex);
      var count = 0;
      for (var i = 0; i < this.attributes[rowIndex].length; i++) {
        if ((this.attributes[rowIndex])[i] === 1) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //[0, 0, 0, 0]
      //look at every row
      //if even 1 row has conflict, return true
      //base case is if n === 1
      //n - 1

      // if (n === 1) {
      //   return false;
      // }

      // var rowConflict = function(n) {

      //   rowConflict(n - 1);
      // };

      // console.log();
      var rows = this.attributes.n;
      // console.log('this.attributes.n', this.attributes.n);
      // console.log('this.attributes', this.attributes);
      // console.log('this.attributes[rows - 1]', this.attributes[rows - 1]);
      // this.hasConflictAt
      // // // return false; // fixme
      // while (rows > 1) {
      //   var count = 0;
      //   for (var i = 0; i < this.attributes[rows - 1].length - 1; i++) {
      //     if ((this.attributes[rows - 1])[i] === 1) {
      //       count++;
      //       console.log('Count', count);
      //     }
      //     rows--;
      //     // //console.log('Rows', rows);
      //   }
      //   if (count > 1) {
      //     return true;
      //   }
      // }
      // return false;
      while (rows > 1) {
        if (this.hasRowConflictAt(rows - 1) === true) {
          return true;
        }
        rows--;
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //console.log(this.attributes);
      var count = 0;
      var rowNum = this.attributes.n;
      for (var i = 0; i < rowNum; i++) {
        if (this.attributes[i][colIndex] === 1) {
          count++;
          //console.log('count', count);
        }
      }
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var colNum = this.attributes.n;
      while (colNum >= 1) {
        if (this.hasColConflictAt(colNum - 1) === true) {
          return true;
        }
        colNum--;
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //console.log('THIS.ATTRIBUTES', this.attributes);
      // console.log('THIS.ATTRIBUTES N', this.attributes.n);
      // console.log('major', majorDiagonalColumnIndexAtFirstRow);
      // console.log('attribute', this.attributes);
      // console.log('board', this.rows())
      // console.log('rows', this.rows()[0]);
      // console.log('column', this.rows()[0][1])
      //console.log('if Queen', this.attributes[1][1]);

      //I - column - row
      //O - if diagonal conflict
      //C - checking only ONE specific major diagnoal
      //E -

      //if we go through our board, and find just the column-rows that EQUAL our given input.
      //push the ones that equal our given input into an array

      //iterate through this array
      //then we check if those contain 1. If so, add to count
      //if count is > 1, then true. Else, false

      var count = 0;
      var length = this.attributes.n;
      var col = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;

      while (col < length) {
        if (this._isInBounds(col, row) && this.attributes[row][col] === 1) {
          count++;
        }
        row++;
        col++;
      }

      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var colNum = this.attributes.n - 1;
      while (colNum >= 0) {
        if (this.hasMajorDiagonalConflictAt(colNum) || this.hasMajorDiagonalConflictAt(-colNum)) {
          return true;
        }
        colNum--;
      }
      return false; // fixme


      // _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      //   return colIndex - rowIndex;
      // },
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var length = this.attributes.n;
      var col = minorDiagonalColumnIndexAtFirstRow;
      var row = 0;

      while (col >= 0) {
        if (this._isInBounds(col, row) && this.attributes[row][col] === 1) {
          count++;
        }
        row++;
        col--;
      }

      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var colNum = 0;
      var length = this.attributes.n - 1;
      while (colNum < length + length) {
        if (this.hasMinorDiagonalConflictAt(colNum)) {
          return true;
        }
        colNum++;
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
