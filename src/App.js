import React, { Component } from 'react'
import config from './config/Config'
import LifeformInfo from './LifeformInfo/LifeformInfo'
import Lifeform from './Lifeform/Lifeform';
import Timer from './Timer'
import Renderer from './Renderer';
import {addLifeform} from './index'


export default class App extends Component {

  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()

    this.renderer = new Renderer()
    this.onLifeformSelect = this.onLifeformSelect.bind(this)
    this.renderer.onLifeformSelect = this.onLifeformSelect
    this.gameUpdate = this.gameUpdate.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.createLife = this.createLife.bind(this)

    this.state = {
      focusedLifeform: null
    }
  }

  componentDidMount() {
    this.timer = new Timer()
    this.gameLoop()
  }

  onLifeformSelect(lifeform) {
    this.setState({focusedLifeform: lifeform})
  }

  gameLoop() {
      this.gameUpdate(this.timer.getDelta() * config.speed)
      this.canvasRef.current && 
        this.renderer.render({
          lifeforms: this.props.lifeforms
        }, this.state.focusedLifeform, this.canvasRef.current)
      setTimeout(this.gameLoop, 0)
  }

  gameUpdate(delta) {
    this.props.lifeforms.forEach(lifeform => lifeform.update(delta))
  }

  createLife() {
    addLifeform(new Lifeform())
  }

  render() {
    let {focusedLifeform} = this.state
    let {lifeforms} = this.props
    return (
      <div className='App'>
        <div className='Menu'>
          <button onClick={this.createLife}>Create life</button>
          {focusedLifeform && <LifeformInfo lifeform={focusedLifeform} />}
        </div>
        <div className="CanvasWrapper">
          <canvas className="RenderCanvas" ref={this.canvasRef} />
        </div>
      </div>
    )
  }
}
