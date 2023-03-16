/*
  Created by Michael Ivanov
  Github : https://github.com/m1ke782
*/

class Vector
{
  static lerp(v0, v1, t) { return v0*(1-t)+v1*t }

  static Equals(a,b)
  {
    for (let i = 0; i < Math.min(a.length, b.length); i++)
    {
      if (a[i] != b[i])
        return false;
    }
    return true;
  }
  static Add(a,b)
  {
    let out = new Array();
    for (let i = 0; i < Math.min(a.length,b.length); i++)
      out.push(a[i]+b[i]);
    return out;
  }
  static Invert(v)
  {
    let o = new Array();
    for (let i = 0; i < v.length; i++)
      o.push(-v[i]);
    return o;
  }
  static Subtract(a,b)
  {
    let b0 = Vector.Invert(b);
    return Vector.Add(a,b0);
  }
  static Scale(v,s)
  {
    let o = new Array();
    for (let i = 0; i < v.length; i++)
      o.push(v[i] * s);
    return o;
  }
  static Lerp(a,b,c)
  {
    let o = new Array();
    for (let i = 0; i < Math.min(a.length, b.length); i++)
      o.push(lerp(a[i], b[i], c));
    return o;
  }
  static ToNthDimension(v,d)
  {
    let out = new Array();
    for (let i = 0; i < d; i++)
    {
      if (v.length > i)
        out.push(v[i]);
      else
        out.push(0);
    }
    return out;
  }
  static Dot(a,b)
  {
    let o = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++)
      o += (a[i]*b[i]);
    return o;
  }
  static Magnitude(v, squared = false)
  {
    let o = 0;
    for (let i = 0; i < v.length; i++)
      o += (v[i]*v[i]);
    if (squared)
      return o;
    return Math.sqrt(o);
  }
  static Distance(a,b)
  {
    return Vector.Magnitude(Vector.Subtract(a,b));
  }
  static Angle(a,b)
  {
    let d = Vector.Dot(a,b);
    let radians = Math.acos(d);
    return radians;
  }
  static AngleAxis(euler)
  {
    let pitch = euler[0];
    let yaw = euler[1];
    let x = -Math.sin(yaw);//Math.sin(yaw) * Math.sin(pitch);
    let y = Math.sin(pitch);//Math.cos(yaw) * Math.sin(pitch);
    let z = Math.cos(yaw);
    return [x,y,z];
  }
  static Cross(a,b)
  {
    if (a.length != b.length)
      return null;

    if (a.length == 2)
    {
      return a[0] * b[1] - a[1] * b[0];
    }
    else if (a.length == 3)
    {
      let x = a[1]*b[2] - a[2]*b[1];
      let y = a[2]*b[0] - a[0]*b[2];
      let z = a[0]*b[1] - a[1]*b[0];
      return [x,y,z];
    } 
    return null;
  }
  static CrossFloat(a,b)
  {
    if (isNaN(a)) //a is vector
      return [b * a[1], -b * a[1]];
    else if (isNaN(b)) //b is vector
      return [-a * b[1], a * b[0]];
    return null; //shouldnt get here
  }
  static Normalise(v)
  {
    let m = Vector.Magnitude(v);
    return Vector.Scale(v, 1/m);
  }
  static Reflect(v,n)
  {
    n = Vector.Normalise(n);
    //r=v−2(v⋅n)n
    let d = Vector.Dot(v,n);
    let first = Vector.Scale(n,2*d);
    return Vector.Subtract(v,first);
  }
  static Random(d, normalise = true)
  {
    let v = new Array();
    for (let i = 0; i < d; i++)
      v.push(Math.random() - 0.5);
    if (normalise)
      v = Vector.Normalise(v);
    return v;
  }
  static PrintMatrix(m)
  {
    let stringMatrix = new Array();
    let longest = 0;
    for (let r = 0; r < m.length; r++)
    {
      let thisRow = new Array();
      for (let c = 0; c < m[r].length; c++)
      {
        let stringed = m[r][c].toString();
        thisRow.push(stringed);
        longest = Math.max(longest, stringed.length);
      }
      stringMatrix.push(thisRow);
    }
    longest++;
    console.log("-----~-----");
    for (let r = 0; r < m.length; r++)
    {
      let thisRowString = "";
      for (let c = 0; c < m[r].length; c++)
      {
        let thisString = stringMatrix[r][c];
        let toLongest = longest - thisString.length;
        for (let i = 0; i < toLongest; i++)
          thisString+= " ";
        thisRowString+=thisString;
      }
      console.log(thisRowString);
    }
    console.log("-----~-----");
  }
  static GetRow(ma, r)
  {
    return ma[r];
  }
  static GetColumn(ma,c)
  {
    let o = new Array();
    for (let i = 0; i < ma.length; i++)
      o.push(ma[i][c]);
    return o;
  }
  static MulScalarMatrix(ma,s)
  {
    for (let x = 0; x < ma.length; x++)
    {
      for (let y = 0; y < ma[x].length; y++)
        ma[x][y] *= s;
    }
    return ma;
  }
  static MulVectorMatrix(ma, v)
  {
    if (v.length != ma[0].length)
      return null;
    let o = new Array();
    for (let m = 0; m < ma.length; m++)
      o.push(Vector.Dot(ma[m], v));
    return o;
  }
  static MulMatrix(m0, m1)
  {
    //first length is columns, second length is rows
    if (m0[0].length != m1.length)
      return null;
    let o = new Array();
    for (let i = 0; i < m0.length; i++)
    {
      let row = new Array();
      for (let x = 0; x < m1[i].length; x++)
      {
        let first = Vector.GetRow(m0, i);
        let second = Vector.GetColumn(m1,x);
        let dot = Vector.Dot(first,second);
        row.push(dot);
      }
      o.push(row);
    }
    return o;
  }
  static ColumnMatrix(v)
  {
    let o = new Array();
    for (let i = 0; i < v.length; i++)
      o.push([v[i]]);
    return o;
  }
  static Identity(size)
  {
    let o = new Array();
    for (let x = 0; x < size; x++)
    {
      let row = new Array();
      for (let y = 0; y < size; y++)
      {
        if (x == y)
          row.push(1);
        else 
          row.push(0);
      }
      o.push(row);
    }
    return o;
  }
  static Minor(m,row,column)
  {
    let o = new Array();
    for (let r = 0; r < m.length; r++)
    {
      let thisrow = new Array();
      for (let c = 0; c < m[r].length; c++)
      {
        if (c != column)
          thisrow.push(m[r][c]);
      } 
      if (r != row)
      o.push(thisrow);
    }
    return o;
  }
  static Determinant(m)
  {
    if (m.length != m[0].length)
      return null; //matrix must be square
    if (m.length == 2) //2x2 is simple
      return (m[0][0] * m[1][1]) - (m[0][1]*m[1][0]);
    //iterative for higher dimensions
    let out = 0;
    for (let i = 0; i < m.length; i++)
    {
      let top = m[0][i];
      let minor = Vector.Minor(m,0,i);
      let minorDeterminant = Vector.Determinant(minor);
      let cofactor = top * minorDeterminant;
      if (i % 2 == 1)
        cofactor *= -1;
      out += cofactor;
    }
    return out;
  }
  static MinorMatrix(m)
  {
    let out = new Array();
    for (let r = 0; r < m.length; r++)
    {
      let thisRow = new Array();
      for (let c = 0; c < m[r].length; c++)
      {
        let thisV = m[r][c];
        let minor = Vector.Minor(m,r,c);
        let minorDeterminant = minor;
        try 
        {
          minorDeterminant = Vector.Determinant(minor);
        }
        catch 
        {
          //this matrix is one dimensional
        }
        thisRow.push(minorDeterminant);
      }
      out.push(thisRow);
    }
    return out;
  }
  static MatrixOfCofactors(mm)
  {
    for (let r = 0; r < mm.length; r++)
    {
      for (let c = 0; c < mm[r].length; c++)
      {
        if ((c+r)%2 == 1)
          mm[r][c] *= -1;
      }
    }
    return mm;
  }
  static Transpose(m)
  {
    let out = new Array();
    for (let r = 0; r < m.length; r++)
    {
      let thisRow = new Array();
      for (let c = 0; c < m[r].length; c++)
        thisRow.push(m[c][r]);
      out.push(thisRow);
    }
    return out;
  }
  static Inverse(m)
  {
    let det = Vector.Determinant(m);
    if (det == 0)
      return null;
    det = 1/det;
    let mm = Vector.MinorMatrix(m);
    let moc = Vector.MatrixOfCofactors(mm);
    let adj = Vector.Transpose(moc);
    return Vector.MulScalarMatrix(adj,det);
  }
  static RotationMatrix(angle)
  {
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    return [[c,-s],[s,c]];
  }
  static TransformPoint(ma, p)
  {
    let dimension = p.length;
    let difference = ma.length - p.length;
    let point = p;
    for (let i = 0; i < difference; i++)
      if (i+1 == difference)
        point.push(1);
      else
        point.push(0);
    let transformed = Vector.MulVectorMatrix(ma, point);
    return Vector.ToNthDimension(transformed, dimension);
  }
}
