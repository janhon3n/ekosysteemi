import React, { Component } from 'react'

export default class AttributeTable extends Component {
  render() {
    let {lifeform, focusedAttributeIndex, onAttributeSelected} = this.props
    return (
      <table className="AttributeTable">
        <tbody>
          {Object.keys(lifeform.attributes).map((key, index) => {
            let value = roundString(lifeform.attributes[key].toString())
            let hue = (360 / Object.keys(lifeform.attributes).length) * index
            return (
              <tr
                onClick={() => {
                  onAttributeSelected(index)
                }}
                style={{
                  backgroundColor:
                    focusedAttributeIndex === index
                      ? 'hsl(' + hue + ', 90%, 85%)'
                      : 'hsl(' + hue + ', 90%, 95%)'
                }}
              >
                <th>{key}</th>
                <td>{value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

function roundString(str) {
  return String(Math.round(Number(str) * 100) / 100)
}