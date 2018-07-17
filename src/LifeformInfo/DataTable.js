import React, { Component } from 'react'

export default class DataTable extends Component {
  constructor(props){
    super(props)
    this.forceUpdate = this.forceUpdate.bind(this)
  }

  componentDidMount() {
    this.updateInterval = setInterval(this.forceUpdate, 400)
  }
  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }
  
  render() {
    let data = {
      position: this.props.lifeform.position.toString(),
      speed: this.props.lifeform.speed.toString(),
      acceleration: this.props.lifeform.acceleration.toString(),
      children: this.props.lifeform.childCount,
      sexualTension: roundString(this.props.lifeform.sexualTension),
    }
    return (
      <table className='DataTable'>
        <tbody>
          {Object.keys(data).map(key => {
            let value = data[key].toString()
            return (<tr><th>{key}</th><td>{value}</td></tr>)
          })}
        </tbody>
      </table>
    )
  }
}

function roundString(str) {
  return String(Math.round(Number(str) * 100) / 100)
}