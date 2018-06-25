import config from '../config/Config'

export default function Renderer(canvas) {
  var context = canvas.getContext('2d')

  context.canvas.width = config.width
  context.canvas.height = config.height

  this.render = state => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    state.lifeforms.forEach(lifeform => {
      let width = lifeform.getSize().x
      let height = lifeform.getSize().y
      context.fillStyle = 'hsl(' + lifeform.getColor() + ', 80%, 40%)'
      context.fillRect(
        lifeform.position.x - width / 2,
        lifeform.position.y - height / 2,
        width,
        height
      )
    })
    context.closePath()
  }
}
