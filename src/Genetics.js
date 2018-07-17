import Vector from './Vector'
import config from './config/Config'

const A = {
  value: 0,
  char: 'A'
}
const T = {
  value: 0.333,
  char: 'T'
}
const C = {
  value: 0.667,
  char: 'C'
}
const G = {
  value: 1,
  char: 'G'
}

export default function Genetics(genes) {

  this.genes = genes || Genetics.getRandomGenes()

  this.calculateAttribute = att => {
    if (att.range === undefined) att.range = [0, 1]
    let percentage = 0
    let locusAmount = att.locus.correlation.length + att.locus.inverse.length
    let step = 1 / locusAmount

    let indexToValue = index => {
      return this.genes[index-1].value
    }

    let correlationValues = att.locus.correlation.map(indexToValue)
    let inverseValues = att.locus.inverse.map(indexToValue).map(v => 1 - v)
    correlationValues.concat(inverseValues).forEach(v => (percentage += v * step))

    let value = att.range[0] + percentage * (att.range[1] - att.range[0])
    if (att.is2D) return new Vector(value, value)
    return value
  }

  this.mutate = numberOfMutations => {
    let newGenes = this.genes.slice()
    for (let i = 0; i < numberOfMutations; i++){
      let pos = Math.floor(Math.random() * newGenes.length)
      newGenes[pos] = Genetics.getRandomGene()
    }
    return new Genetics(newGenes)
  }

  this.duplicate = () => {
    return new Genetics(this.genes.slice())
  }

  this.toString = () => {
    let string = ''
    this.genes.forEach(gene => string += gene.char)
    return string
  }
}

Genetics.geneCount = 20

Genetics.getRandomGene = () => {
  return [A,T,C,G][Math.floor(Math.random() * 4)]
}

Genetics.getRandomGenes = () => {
  let genes = []
  for (let i = 0; i < Genetics.geneCount; i++) {
    genes.push(Genetics.getRandomGene())
  }
  return genes
}

Genetics.combine = (geneticsA, geneticsB) => {
  let newGenes = []
  for (let i = 0; i < Genetics.geneCount; i++) {
    newGenes.push(Math.random() < 0.5 ?
      geneticsA.genes[i] :
      geneticsA.genes[i]
    )
  }
  return new Genetics(newGenes)
}

Genetics.areCloseFenotypes = (geneticsA, geneticsB) => {
  let differentGenes = 0
  for (let i = 0; i < Genetics.geneStringLength; i++) {
    if(geneticsA.genes[i].char === geneticsB.genes[i].char)
      differentGenes++
      if(differentGenes > config.closeFenotypeLimit) return false
  }
  return true
}
