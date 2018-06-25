export default function bindAction(action, callback) {
  document.getElementById(action).onclick = callback
}
