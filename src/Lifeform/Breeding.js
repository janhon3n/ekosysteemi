import Lifeform from './Lifeform'
import config from '../config/Config'
import Genetics from '../Genetics'
import {getLifeforms, addLifeform} from '../index'

export default function Breeding() {
  this.updateBreeding = delta => {
    this.sexualTension += config.sexualTensionRefillSpeed * delta
    if(this.sexualTension > 1) {
      let lifeformToBreedWith = getLifeforms()
        .filter(lifeform => lifeform != this)
        .filter(lifeform => Genetics.areCloseFenotypes(lifeform.genetics, this.genetics))
        .find(lifeform => {
        return this.collidesWith(lifeform)
      })
      if(lifeformToBreedWith) this.breedWith(lifeformToBreedWith)
    }
  }

  this.breedAlone = () => {
    let newLifeform = new Lifeform(this.genetics.duplicate().mutate(15))
    newLifeform.position = this.position
  }

  this.breedWith = lifeform => {
    let newLifeform = new Lifeform(
      Genetics.combine(this.genetics, lifeform.genetics).mutate(1)
    )
    newLifeform.position = this.position.scale(1)
    addLifeform(newLifeform)
    lifeform.sexualTension = 0
    this.sexualTension = 0
    lifeform.children += 1
    this.children += 1
  }
}
