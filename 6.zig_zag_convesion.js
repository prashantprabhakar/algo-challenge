/**
 * 
 */

function zigZagConversion(str, numRows) {
    if(numRows === 1) return str;
    let matrix = Array(numRows).fill(null).map(() => Array(str.length));
    let count = 0;
    let col = 0, row = 0;
    while(count < str.length) {
        // fill column
        while(row < numRows && count < str.length) {
            matrix[row][col] = str[count];
            count++;
            row++;
        }

        // fill the diagonals
        row = numRows-2;
        col++;
        while(row > 0 && count < str.length) {
            matrix[row][col] = str[count];
            count++;
            col++;
            row--;
        }
    }

    // now compute word from matrix
    let outputArr = [];
    for(let i=0; i<numRows; i++) {
        for(let j=0; j<str.length; j++) {
            if(matrix[i][j] !== undefined) {
                outputArr.push(matrix[i][j])
            }
        }
    }
    return outputArr.join('')
}

console.log(zigZagConversion('PAYPALISHIRING', 1))