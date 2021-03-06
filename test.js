/*

test.js - square matrix multiply test

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

var squareMatrixMultiply = require('./index.js');

var test = module.exports = {};

test['naive algorithm\n[1 2] * [2 0] = [4  4]\n[3 4]   [1 2]   [10 8]'] = function (test) {
    test.expect(1);
    test.deepEqual(squareMatrixMultiply([[1, 2], [3, 4]], [[2, 0], [1, 2]]), [[4, 4], [10, 8]]);
    test.done();
};

test['naive algorithm\n[2 0] * [1 2] = [2  4]\n[1 2]   [3 4]   [7 10]'] = function (test) {
    test.expect(1);
    test.deepEqual(squareMatrixMultiply([[2, 0], [1, 2]], [[1, 2], [3, 4]]), [[2, 4], [7, 10]]);
    test.done();
};

var testName = [
    'naive algorithm',
    '[1  6  7 3]   [7 8 2 -9]   [46 38 34   1]',
    '[9  3 -2 2] * [3 4 2  0] = [86 88 24 -81]',
    '[8 -1 -3 4]   [0 0 2  1]   [81 68 16 -71]',
    '[6  0  2 1]   [7 2 2  1]   [49 50 18 -51]',
].join('\n');
test[testName] = function (test) {
    test.expect(1);
    test.deepEqual(squareMatrixMultiply(
        [[1, 6, 7, 3], [9, 3, -2, 2], [8, -1, -3, 4], [6, 0, 2, 1]],
        [[7, 8, 2, -9], [3, 4, 2, 0], [0, 0, 2, 1], [7, 2, 2, 1]]), 
        [[46, 38, 34, 1], [86, 88, 24, -81], [81, 68, 16, -71], [49, 50, 18, -51]]);
    test.done();
};

test['naive algorithm\n[-4  2  5]   [-2  1  2]   [ 38 37 44]\n[ 6  3 -3] * [ 5  3  6] = [ -9 -6  6]\n[ 4 -1  0]   [ 4  7  8]   [-13  1  2]'] = function (test) {
    test.expect(1);
    test.deepEqual(squareMatrixMultiply([[-4, 2, 5], [6, 3, -3], [4, -1, 0]],[[-2, 1, 2], [5, 3, 6], [4, 7, 8]]), [[38, 37, 44], [-9, -6, 6], [-13, 1, 2]]);
    test.done();
};

test['Strassen algorithm\n[1 2] * [2 0] = [4  4]\n[3 4]   [1 2]   [10 8]'] = function (test) {
    test.expect(1);
    test.deepEqual(squareMatrixMultiply([[1, 2], [3, 4]], [[2, 0], [1, 2]], 'strassen'), [[4, 4], [10, 8]]);
    test.done();
};

test['Strassen algorithm\n[2 0] * [1 2] = [2  4]\n[1 2]   [3 4]   [7 10]'] = function (test) {
    test.expect(1);
    test.deepEqual(squareMatrixMultiply([[2, 0], [1, 2]], [[1, 2], [3, 4]], 'strassen'), [[2, 4], [7, 10]]);
    test.done();
};

testName = [
    'Strassen algorithm',
    '[1  6  7 3]   [7 8 2 -9]   [46 38 34   1]',
    '[9  3 -2 2] * [3 4 2  0] = [86 88 24 -81]',
    '[8 -1 -3 4]   [0 0 2  1]   [81 68 16 -71]',
    '[6  0  2 1]   [7 2 2  1]   [49 50 18 -51]',
].join('\n');
test[testName] = function (test) {
    test.expect(1);
    test.deepEqual(squareMatrixMultiply(
        [[1, 6, 7, 3], [9, 3, -2, 2], [8, -1, -3, 4], [6, 0, 2, 1]],
        [[7, 8, 2, -9], [3, 4, 2, 0], [0, 0, 2, 1], [7, 2, 2, 1]], 'strassen'), 
        [[46, 38, 34, 1], [86, 88, 24, -81], [81, 68, 16, -71], [49, 50, 18, -51]]);
    test.done();
};