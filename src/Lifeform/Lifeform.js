import Genetics from '../Genetics'
import attributes from '../config/Attributes.json'
import config from '../config/Config'
import Vector from '../Vector'
import Movement from './Movement'
import Breeding from './Breeding'
import {getLifeforms} from '../index'

function Lifeform(genetics) {
  Breeding.call(this)
  Movement.call(this)

  if (genetics === undefined) genetics = new Genetics()

  this.genetics = genetics  
  this.attributes = {}
  attributes.forEach(att => {
    this.attributes[att.name] = genetics.calculateAttribute(att)
  })

  this.childCount = 0
  this.generation = 0
  this.sexualTension = 0

  this.getGenes = () => {
    return this.genetics.toString().split('')
  }

  this.update = delta => {
    this.updateMovement(delta)
    this.updateBreeding(delta)
  }

  this.isHit = point => {
    return this.position.substract(point).abs() < this.attributes.size
  }

  this.getLifeformsInVision = () => {
    return getLifeforms().filter(lifeform => {
      return this.position.substract(lifeform.position).abs() < this.attributes.vision
    })
  }

  this.collidesWith = lifeform => {
    return lifeform.position.substract(this.position).abs() < config.collidingDistance
  }

  this.toString = () => {
    return this.genetics.toString()
  }
}

export default Lifeform
