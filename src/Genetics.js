import attributes from '../config/Attributes.json'
import Vector from './Vector'

export default function Genetics(geneString) {
  this.setToRandomGenes = () => {
    geneString = ''
    for (let i = 0; i < Genetics.geneStringLength; i++) {
      geneString = geneString + this.getRandomGene().char
    }
  }

  this.getRandomGene = () => {
    return Genetics.geneTypes[Math.floor(Math.random() * 4)]
  }

  this.createAttributeValueFunc = att => () => {
    if (att.range === undefined) att.range = [0, 1]
    let percentage = 0
    let locusAmount = att.locus.correlation.length + att.locus.inverse.length
    let step = 1 / locusAmount

    let indexToValue = index => {
      return Genetics.geneCharToValue(geneString.charAt(index))
    }

    let correlationValues = att.locus.correlation.map(indexToValue)
    let inverseValues = att.locus.inverse.map(indexToValue).map(v => 1 - v)
    correlationValues.concat(inverseValues).forEach(v => (percentage += v * step))

    let value = att.range[0] + percentage * (att.range[1] - att.range[0])
    if (att.is2D) return new Vector(value, value)
    return value
  }

  this.mutate = numberOfMutations => {
    let pos = Math.floor(Math.random() * geneString.length)
    return new Genetics(
      geneString.slice(0, pos) + this.getRandomGene().char + geneString.slice(pos + 1)
    )
  }

  this.duplicate = () => {
    return new Genetics(geneString)
  }

  this.toString = () => {
    return geneString
  }

  if (geneString === undefined) this.setToRandomGenes()
}

Genetics.geneStringLength = 40
Genetics.geneTypes = [
  {
    char: 'A',
    value: 0
  },
  {
    char: 'T',
    value: 0.333333
  },
  {
    char: 'G',
    value: 0.666667
  },
  {
    char: 'C',
    value: 1
  }
]
Genetics.geneCharToValue = char => {
  return Genetics.geneTypes.find(g => g.char === char).value
}
