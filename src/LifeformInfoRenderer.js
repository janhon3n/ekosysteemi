import attributes from '../config/Attributes'

export default function LifeformInfoRenderer(div) {
  this.render = lifeform => {
    let html = lifeform.toString()
    html += '<table><tbody>'
    attributes.forEach(att => {
      let value = lifeform['get' + att.name.capitalize()]()
      html += '<tr>'
      html += '<th>' + att.name + '</th>'
      html += '<td>' + round(value) + '</td>'
      html += '</tr>'
    })
    html += '</tbody></table>'
    div.innerHTML = html
  }
}

function round(string) {
  let num = Number(string)
  let roundedNum = Math.round(num * 100) / 100
  return '' + roundedNum
}
