const coordinates = [
  {canton: 'AG' , x: '486px', y: '96px'},
  {canton: 'AA' , x: '659px', y: '119px'},
  {canton: 'AI' , x: '708px', y: '140px'},
  {canton: 'BL' , x: '420px', y: '115px'},
  {canton: 'BS' , x: '392px', y: '74px'},
  {canton: 'BE' , x: '410px', y: '276px'},
  {canton: 'FR' , x: '320px', y: '271px'},
  {canton: 'GE' , x: '167px', y: '390px'},
  {canton: 'GL' , x: '637px', y: '211px'},
  {canton: 'GB' , x: '686px', y: '271px'},
  {canton: 'JU' , x: '320px', y: '110px'},
  {canton: 'LU' , x: '480px', y: '185px'},
  {canton: 'NE' , x: '265px', y: '208px'},
  {canton: 'NW' , x: '527px', y: '223px'},
  {canton: 'OW' , x: '485px', y: '239px'},
  {canton: 'SH' , x: '557px', y: '34px'},
  {canton: 'SZ' , x: '587px', y: '190px'},
  {canton: 'SO' , x: '392px', y: '150px'},
  {canton: 'SG' , x: '631px', y: '153px'},
  {canton: 'TI' , x: '597px', y: '360px'},
  {canton: 'TG' , x: '624px', y: '72px'},
  {canton: 'UR' , x: '565px', y: '264px'},
  {canton: 'VD' , x: '232px', y: '298px'},
  {canton: 'VS' , x: '404px', y: '405px'},
  {canton: 'ZG' , x: '547px', y: '162px'},
  {canton: 'ZH' , x: '580px', y: '114px'},
]

const swissMap = document.querySelector('.swiss-map')
const redCircle = document.querySelector('.red-circle');





const createBubble = coordinate => {
  const div = document.createElement('div')
  div.classList.add('bubble')
  div.id = `bubble-${coordinate.canton}`
  div.style.left = coordinate.x
  div.style.top = coordinate.y
  swissMap.appendChild(div)
}

coordinates.forEach(coordinate => createBubble(coordinate))


redCircle.style.top = '275px'
redCircle.style.left = '409px'




// For finding the coordinates on the image

let x, y = 0

const getXYPos = element => {
  x = element.offsetLeft
  y = element.offsetTop

  element = element.offsetParent

  while(element != null) {
    x = parseInt(x) + parseInt(element.offsetLeft)
    y = parseInt(y) + parseInt(element.offsetTop)
    element = element.offsetParent
  }

  return {x, y}
}

const getCoord = (element, event) => {
  let xyPos = getXYPos(element)

  x = event.pageX
  y = event.pageY

  x = x - xyPos.x;
  y = y - xyPos.y;

  console.log('x', x, 'y', y)
}

swissMap.addEventListener('click', (event) => {
  getCoord(swissMap, event)
})