/*

index.js - square matrix multiply

The MIT License (MIT)

Copyright (c) 2013 Tristan Slominski

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

"use strict";

var squareMatrixMultiply = module.exports = function squareMatrixMultiply (A, B, algorithm) {
    switch (algorithm && algorithm.toLowerCase()) {
        case 'strassen': 
            return strassen(A, B);
        case 'naive':
        default:
            return naive(A, B);
    }
};

var naive = function naive (A, B) {
    var n = A.length;
    var C = [];
    for (var e = 0; e < n; e++) {
        C.push([]);
    }
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            C[i][j] = 0;
            for (var k = 0; k < n; k++) {
                C[i][j] = C[i][j] + (A[i][k] * B[k][j]);
            }
        }
    }
    return C;
};

var strassen = function strassen (A, B) {
    var n = A.length;
    var C = [];
    for (var e = 0; e < n; e++) {
        C.push([]);
    }
    if (n == 1) {
        C[0][0] = A[0][0] * B[0][0];
    } else {
        var halfOfN = n / 2;

        // matrix partitions initialization
        var A11 = [], A12 = [], A21 = [], A22 = [];
        var B11 = [], B12 = [], B21 = [], B22 = [];
        for (e = 0; e < halfOfN; e++) {
            A11.push([]);
            A12.push([]);
            A21.push([]);
            A22.push([]);
            B11.push([]);
            B12.push([]);
            B21.push([]);
            B22.push([]);
        }
        var row, column;
        for (row = 0; row < halfOfN; row++) {
            for (column = 0; column < halfOfN; column++) {
                A11[row][column] = A[row][column];
                B11[row][column] = B[row][column];
            }
            for (column = halfOfN; column < n; column++) {
                A12[row][column - halfOfN] = A[row][column];
                B12[row][column - halfOfN] = B[row][column];
            }
        }
        for (row = halfOfN; row < n; row++) {
            for (column = 0; column < halfOfN; column++) {
                A21[row - halfOfN][column] = A[row][column];
                B21[row - halfOfN][column] = B[row][column];
            }
            for (column = halfOfN; column < n; column++) {
                A22[row - halfOfN][column - halfOfN] = A[row][column];
                B22[row - halfOfN][column - halfOfN] = B[row][column];
            }
        }

        // strassen matrices
        var S1 = [], S2 = [], S3 = [], S4 = [], S5 = [], S6 = [], S7 = [],
            S8 = [], S9 = [], S10 = [];
        for (e = 0; e < halfOfN; e++) {
            S1.push([]);
            S2.push([]);
            S3.push([]);
            S4.push([]);
            S5.push([]);
            S6.push([]);
            S7.push([]);
            S8.push([]);
            S9.push([]);
            S10.push([]);
        }

        for (row = 0; row < halfOfN; row++) {
            for (column = 0; column < halfOfN; column++) {
                S1[row][column] = B12[row][column] - B22[row][column];
                S2[row][column] = A11[row][column] + A12[row][column];
                S3[row][column] = A21[row][column] + A22[row][column];
                S4[row][column] = B21[row][column] - B11[row][column];
                S5[row][column] = A11[row][column] + A22[row][column];
                S6[row][column] = B11[row][column] + B22[row][column];
                S7[row][column] = A12[row][column] - A22[row][column];
                S8[row][column] = B21[row][column] + B22[row][column];
                S9[row][column] = A11[row][column] - A21[row][column];
                S10[row][column] = B11[row][column] + B12[row][column];
            }
        }

        // actual computations
        var P1 = strassen(A11, S1);
        var P2 = strassen(S2, B22);
        var P3 = strassen(S3, B11);
        var P4 = strassen(A22, S4);
        var P5 = strassen(S5, S6);
        var P6 = strassen(S7, S8);
        var P7 = strassen(S9, S10);

        // assemble computations in original matrix
        for (row = 0; row < halfOfN; row++) {
            for (column = 0; column < halfOfN; column++) {
                C[row][column]                     = P5[row][column] + P4[row][column] - P2[row][column] + P6[row][column];
                C[row][column + halfOfN]           = P1[row][column] + P2[row][column];
                C[row + halfOfN][column]           = P3[row][column] + P4[row][column];
                C[row + halfOfN][column + halfOfN] = P5[row][column] + P1[row][column] - P3[row][column] - P7[row][column];
            }
        }
    }
    return C;
};