export default function Timer() {
  var time = new Date().getTime()

  this.getDelta = () => {
    let newtime = new Date().getTime()
    let delta = (newtime - time) / 1000
    time = newtime
    return delta
  }
}
