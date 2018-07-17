import config from './config/Config.json'
import Vector from './Vector'

export default function Renderer() {

  var lastState = null
  var lastCanvas = null
  this.onLifeformSelect = null

  this.handleClick = (event) => {
    let hitLifeform = lastState.lifeforms.find(lifeform => {
      return lifeform.isHit(new Vector(event.offsetX, event.offsetY))
    })
    if (hitLifeform && this.onLifeformSelect) this.onLifeformSelect(hitLifeform)
  }

  this.render = (state, focusedLifeform, canvas) => {
    var context = canvas.getContext('2d')
    context.canvas.width = config.width
    context.canvas.height = config.height
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    state.lifeforms.forEach(lifeform => {
      context.beginPath()
      context.arc(
        lifeform.position.x,
        lifeform.position.y,
        lifeform.attributes.size,
        0,
        2*Math.PI,
      )
      let fillHue = lifeform.attributes.color
      context.fillStyle = lifeform == focusedLifeform ? 
        'hsl(' + fillHue + ', 100%, 100%)' :
        'hsl(' + fillHue + ', 80%, 40%)'
      context.fill()
      let strokeHue = lifeform.attributes.color2
      context.strokeStyle = 'hsl(' + strokeHue + ', 40%, 50%)'
      context.lineWidth = 3
      context.stroke()
      context.closePath()
    })
    context.closePath()
    lastState = state

    if (lastCanvas != canvas) {
      canvas.addEventListener('click', this.handleClick)
    }
    lastCanvas = canvas
  }
}
