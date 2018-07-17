import React from 'react'
import './LifeformInfo.css'
import DataTable from './DataTable'
import AttributeTable from './AttributeTable'
import Genes from './Genes'

export default class LifeformInfo extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      focusedAttributeIndex: null
    }
  }

  render() {
    let lifeform = this.props.lifeform
    let {focusedAttributeIndex} = this.state

    return (
      <div className='LifeformInfo'>
        <Genes 
          lifeform={lifeform}
          focusedAttributeIndex={focusedAttributeIndex} />
        
        <AttributeTable
          lifeform={lifeform}
          onAttributeSelected={index => {
            this.setState({focusedAttributeIndex: index})
          }}
          focusedAttributeIndex={focusedAttributeIndex} />
        
        <DataTable lifeform={lifeform} />
      </div>
    )
  }
}
