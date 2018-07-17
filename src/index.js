/* global document */
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import './index.css'

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}


var lifeforms = []

let root = document.getElementById('root')
let app = ReactDOM.render(<App lifeforms={lifeforms} />, root)

var getLifeforms = () => {
  return lifeforms
}

var addLifeform = lifeform => {
  lifeforms.push(lifeform)
  app.forceUpdate()
}

export {getLifeforms, addLifeform}

