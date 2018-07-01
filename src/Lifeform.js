import Genetics from './Genetics'
import attributes from '../config/Attributes.json'
import config from '../config/Config'
import { deflateRaw } from 'zlib'
import Vector from './Vector'
import lifeforms from './index'

export default function Lifeform(genetics) {
  this.acceleration = Vector.zero
  this.speed = Vector.zero
  this.position = Vector.zero

  if (genetics === undefined) genetics = new Genetics()
  attributes.forEach(att => {
    this['get' + att.name.capitalize()] = genetics.createAttributeValueFunc(att)
  })

  this.update = delta => {
    this.acceleration = Vector.random()
      .add(this.getLibidoAcceleration())
      .limitAbs(this.getAcceleration())

    this.speed = this.speed.add(this.acceleration)
    this.position = this.position.add(this.speed.scale(delta))

    this.handleWorldBounds()
  }

  this.handleWorldBounds = () => {
    if (!new Vector(0, config.width).scalarIsInRange(this.position.x))
      this.speed = this.speed.scale(-1, 1)
    if (!new Vector(0, config.height).scalarIsInRange(this.position.y))
      this.speed = this.speed.scale(1, -1)
  }

  this.getLibidoAcceleration = () => {
    return Vector.zero
  }

  this.breedAlone = () => {
    let newLifeform = new Lifeform(genetics.duplicate().mutate(15))
    newLifeform.position = this.position
    lifeforms.push(newLifeform)
  }

  this.isHit = point => {
    let size = this.getSize()
    let pos = this.position
    return (
      new Vector(pos.x, pos.x + size.x).scalarIsInRange(point.x) &&
      new Vector(pos.y, pos.y + size.y).scalarIsInRange(point.y)
    )
  }

  this.toString = () => {
    return genetics.toString()
  }
}
