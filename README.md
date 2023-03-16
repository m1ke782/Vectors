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
