# Vectors
A library for vectors and matricies.


## Defining Vectors
There is no "vector" class. A vector is simply a primitive array holding numbers, and can be of any dimension. For example : 
```
let myVector = [1,2,3];
```

## Defining Matricies
There is also no "matrix" class. A matrix is a two dimensional array holding numbers, and again can be of any dimension. For example : 
```
let myMatrix = 
[
  [1,2,3],
  [4,5,6]
];
```
This matrix has two rows and three columns.

## Vector Functions
Here is a list of all functions you can perform on vectors. These functions are static members of "Vector", to avoid clutter.

| Function | Arguments | Description |
| --- | --- | --- |
| Equals | vector, vector | Returns a bool showing whether the two vectors are equal.
| Add | vector, vector | Returns the sum of the two vectors. |
| Subtract | vector, vector | Returns the first vector subtract the second vector. |
| Invert | vector | Returns the inverse of the vector. |
| Scale | vector, float | Returns the given vector scaled by a given scalar. |
| ToNthDimension | vector, int | Returns vector, but either truncated or extended with zeros to match the given dimension. |
| AngleAxis | vector | Returns a vector direction which represents the euler rotation given. |
| Dot | vector, vector | Returns the dot (scalar) product of the two vectors. |
| Magnitude | vector | Returns the magnitude of the vector. |
| Distance | vector, vector | Returns the distance between the two given position vectors. |
| Cross | vector, vector | Returns the cross (vector) product of the two vectors |
| Angle | vector, vector | Returns the angle between the two vectors. |
| Normalise | vector | Returns the normalised vector. |
| Reflect | vector, vector | Returns the first vector reflected along the second vector as a normal. |
| Random | int | Returns a random vector with specified dimension. Bool specified whether the vector should be normalised. |
| Printmatrix | matrix | Prints the matrix with neat spacing. |
| MulScalarMatrix | matrix, float | Returns the result of matrix/scalar multiplication. |
| MulVectorMatrix | matrix, vector | Returns the result of matrix/vector multiplication. |
| MulMatrix | matrix, matrix | Returns the result of matrix/matrix multiplication. |
| ColumnVector | vector | Returns the vector as a column matrix. |
| GetRow | matrix, int | Returns the nth row of a matrix as an array. |
| GetColumn | matrix, int | Returns the nth column of a matrix as an array. |
| Identity | int | Returns an identity matrix of given size. |
| Minor | matrix, int, int | Returns the minor matrix of the given matrix with given row and column. |
| Determinant | matrix | Returns the determinant of the matrix. |
| MinorMatrix | matrix | Returns the minor matrix. |
| MatrixOfCofactors | matrix | Returns the matrix of cofactors. |
| Transpose | matrix | Returns the matrix transposed about the main diagonal. |
| Inverse | matrix | Returns the inverse of given matrix. |
| RotationMatrix | float | Returns a 2D rotation matrix anticlockwise by given angle. |

## Example 
Here is some example of using this library : 
```
let vecA = [1,2];
let matA = [[4,1],[9,1]];
let vecAScaled = Vector.Scale(vecA, 0.4);
let vecAScaledTransformed = Vector.MulVectorMatrix(matA, vecAScaled);
let difference = Vector.Subtract(vecAScaledTransformed, vecA);
```
