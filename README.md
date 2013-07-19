# square-matrix-multiply

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

Square matrix multiply.

## Usage

```javascript
var squareMatrixMultiply = require('square-matrix-multiply');
var matrixA = [[a, b], [c, d]];
var matrixB = [[e, f], [g, h]];
...
var matrixC = squareMatrixMultiply(matrixA, matrixB, 'strassen' /*algorithm selector (default: naive)*/);
```

### Algorithms

#### Naive 

Time complexity: _O(n^3)_

#### Strassen 

Time complexity: _O(n^2.81)_

Strassen algorithm implementation only accepts square matrices the size of a power of 2. For example: 1x1, 2x2, 4x4, 16x16, 32x32, etc...