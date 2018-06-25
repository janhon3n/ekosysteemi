/* global document */
import Renderer from './Renderer'
import Lifeform from './Lifeform'
import bindControl from './Controls'
import Timer from './Timer'
import config from '../config/Config'

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

var lifeforms = []
var canvas = document.getElementById('renderCanvas')
var renderer = new Renderer(canvas)

bindControl('newLifeform', () => {
  lifeforms.push(new Lifeform())
})

async function update(delta) {
  lifeforms.forEach(lf => lf.update(delta))
}

var timer = new Timer()
async function gameLoop() {
  await update(timer.getDelta() * config.speed)
  await renderer.render({
    lifeforms: lifeforms
  })
  setTimeout(gameLoop, 0)
}
gameLoop()

export default lifeforms
