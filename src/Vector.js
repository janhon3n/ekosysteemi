/* Immutable vector */

export default function Vector(x, y) {
  this.x = x
  this.y = y

  this.add = vector => {
    return new Vector(vector.x + this.x, vector.y + this.y)
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
    return this.limit(max.scale(-1), max)
  }

  this.scalarIsInRange = scalar => {
    return this.x < scalar && this.y > scalar
  }
}

Vector.sum = () => {
  let vector = Vector(0, 0)
  for (i = 0; i < arguments.length; i++) {
    vector = vector.add(arguments[i])
  }
  return vector
}
Vector.zero = new Vector(0, 0)
Vector.random = () => {
  return new Vector(2 * (-0.5 + Math.random()), 2 * (-0.5 + Math.random()))
}
