/* Immutable vector */

export default function Vector(x, y) {
  this.x = x
  this.y = y

  this.add = vector => {
    return new Vector(vector.x + this.x, vector.y + this.y)
  }

  this.substract = vector => {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }

  this.scale = (sx, sy) => {
    return new Vector(this.x * sx, this.y * (sy === undefined ? sx : sy))
  }

  this.abs = () => {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  this.limit = (min, max) => {
    let x = this.x
    let y = this.y
    if (x < min.x) x = min.x
    if (y < min.y) y = min.y
    if (x > max.x) x = max.x
    if (y > max.y) y = max.y
    return new Vector(x, y)
  }

  this.limitAbs = max => {
    let abs = this.abs()
    if (abs > max) {
      let theeta = Math.atan(this.y / this.x)
      if (this.x < 0) theeta = theeta + Math.PI
      let newY = Math.sin(theeta)*max
      let newX = Math.cos(theeta)*max
      return new Vector(newX, newY)
    }
    return new Vector(this.x, this.y)
  }

  this.scalarIsInRange = scalar => {
    return this.x < scalar && this.y > scalar
  }

  this.toString = () => {
    if (this.x == this.y) return '' + Math.round(this.x)
    return '(' + Math.round(this.x) + ', ' + Math.round(this.y) + ')'
  }
}

Vector.sum = () => {
  let vector = Vector(0, 0)
  for (let i = 0; i < arguments.length; i++) {
    vector = vector.add(arguments[i])
  }
  return vector
}
Vector.zero = new Vector(0, 0)
Vector.random = scale => {
  return new Vector(2 * (-0.5 + Math.random()), 2 * (-0.5 + Math.random())).scale(scale)
}
