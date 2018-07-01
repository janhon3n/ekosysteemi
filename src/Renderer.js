import config from '../config/Config'
import Vector from './Vector'

export default function Renderer(canvas) {
  var context = canvas.getContext('2d')

  context.canvas.width = config.width
  context.canvas.height = config.height

  var lastState = null

  this.render = state => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    state.lifeforms.forEach(lifeform => {
      let width = lifeform.getSize().x
      let height = lifeform.getSize().y
      let hue = lifeform.getColor()
      context.fillStyle = 'hsl(' + hue + ', 80%, 40%)'
      context.fillRect(
        lifeform.position.x - width / 2,
        lifeform.position.y - height / 2,
        width,
        height
      )
    })
    context.closePath()
    lastState = state
  }

  canvas.onclick = e => {
    if (typeof this.onLifeformSelect === 'function') {
      let hitLifeform = lastState.lifeforms.find(lf => {
        return lf.isHit(new Vector(e.offsetX, e.offsetY))
      })
      hitLifeform ? this.onLifeformSelect(hitLifeform) : 0
    }
  }
}
