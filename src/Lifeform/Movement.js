import Vector from '../Vector'
import config from '../config/Config.json'

export default function Movement() {
  this.acceleration = Vector.zero
  this.speed = Vector.zero
  this.position = new Vector(200, 200)

  this.updateMovement = delta => {
    let randomAccelerationDelta = Vector.random(config.movement.random)
    let libidoAccelerationDelta = this.getLibidoAcceleration().scale(config.movement.libido)
    
    let accelerationDelta = randomAccelerationDelta.add(libidoAccelerationDelta)
    this.acceleration = this.acceleration.add(accelerationDelta).limitAbs(this.attributes.acceleration)

    this.speed = this.speed.add(this.acceleration).limitAbs(this.attributes.speed)
    this.position = this.position.add(this.speed.scale(delta))

    this.handleWorldBounds()
  }

  this.getLibidoAcceleration = () => {
    let acceleration = Vector.zero
    this.getLifeformsInVision().forEach(lifeform => {
      acceleration = acceleration.add(lifeform.position.substract(this.position))
    })
    return acceleration.scale(this.attributes.libido).scale(this.sexualTension).scale(this.sexualTension - 0.5)
  }

  this.handleWorldBounds = () => {
    let size = this.attributes.size
    if (!new Vector(size, config.width - size).scalarIsInRange(this.position.x))
      this.speed = this.speed.scale(-1, 1)
    if (!new Vector(size, config.height - size).scalarIsInRange(this.position.y))
      this.speed = this.speed.scale(1, -1)
  }
}
