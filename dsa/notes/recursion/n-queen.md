Given a chess board of `n` boxes, place n queens in a way that they dont attack each other and return in how many of such arrangement the queens dont attack each other.

Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above


1. approach
   1. we'll be using recursion based approach.
   2. we'll use recursion for row increment and for loop for column increment.
      1. in for loop (for columns)
         1. we'll check given current row and column, is that position safe, if so add it in the board and recursive call for next row.
         2. for back tracking, we'll again make that position not usable.
   3. checking is safe
      1. a queen is in safe position, if
      2. there are no other queens in the same column (above), so take a loop from [i][col]
      3. there are no other queens in the same row (left/right), so take a loop from [row][i]
      4. there are no other queens in the left diagonal (current to left top), so take a loop from i = row, j = col to i >= 0 and j >= 0, to check diagnoal, just make i-- and j--.
      5. there are no other queens in the right diagonal(current to right top), so take a loop from i = row, j = col to i >= 0 and j < n, to check diagonal, just make i-- and j++

<details>
<summary>Approach</summary>

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    let board = [];
    for(let i= 0; i < n; i++){
        board.push(new Array(n).fill(".")); // just to setup the board.
    }
    let ans = [];
    nqueen(board, 0, n, ans);
    return ans;
};

function nqueen(board, row, n, ans) {
    if (row == n) {
        ans.push(board.map(b => b.join("")));
        return;
    }

    for (let j = 0; j < n; j++) {
        if (isSafe(board, row, j, n)) {
            board[row][j] = 'Q';
            nqueen(board, row + 1, n, ans);
            board[row][j] = '.';
        }
    }
}

function isSafe(board, row, col, n){
    // row checking is not required, cause if we every assigned a queen in that row, we'll go to next row right away.
    // vertical
    for(let i = 0; i < n;i++){
        if(board[i][col] == 'Q'){
            return false;
        }
    }

    // left diagonal
    for(let i = row, j = col; i >= 0 && j >= 0; i--, j--){
        if(board[i][j] == 'Q'){
            return false;
        }
    }


    // right diagonal
    for(let i = row, j = col; i >= 0 && j < n; i--, j++){
        if(board[i][j] == 'Q'){
            return false;
        }
    }
    return true;
}
```
</details>