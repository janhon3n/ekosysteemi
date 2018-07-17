import React, { Component } from 'react'
import attributes from '../config/Attributes'

export default class Genes extends Component {
  render() {
    let {focusedAttributeIndex, lifeform } = this.props
    let correlationLocuses = focusedAttributeIndex !== null ?
      attributes[focusedAttributeIndex].locus.correlation :
      []
    let inverseLocuses = focusedAttributeIndex !== null ?
    attributes[focusedAttributeIndex].locus.inverse :
    []

    return (
      <div>
      {
        lifeform.genetics.genes.map((gene, index) => {
          let isCorrelated = correlationLocuses.indexOf(index+1) !== -1
          let isInverse = inverseLocuses.indexOf(index+1) !== -1
          
          let style = isCorrelated ? 
          {
            color:'green',
            fontWeight:'bold'
          } :
          isInverse ?
          {
            color:'red',
            fontWeight:'bold'
          } : 
          {}
          
          return <span style={style}>{gene.char}</span>
        })
      }
      </div>
    )
  }
}
