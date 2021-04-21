import data from './data.js'

const cantonSelections = document.querySelectorAll('.navbar__canton')

const coordinates = [
  {canton: 'AG' , name: ''},
  {canton: 'AA' , name: ''},
  {canton: 'AI' , name: ''},
  {canton: 'BL' , name: ''},
  {canton: 'BS' , name: 'Basel'},
  {canton: 'BE' , name: ''},
  {canton: 'FR' , name: ''},
  {canton: 'GE' , name: ''},
  {canton: 'GL' , name: ''},
  {canton: 'GB' , name: ''},
  {canton: 'JU' , name: ''},
  {canton: 'LU' , name: ''},
  {canton: 'NE' , name: ''},
  {canton: 'NW' , name: ''},
  {canton: 'OW' , name:''},
  {canton: 'SH' , name:'Schaffhausen'},
  {canton: 'SZ' , name:''},
  {canton: 'SO' , name:''},
  {canton: 'SG' , name:''},
  {canton: 'TI' , name:''},
  {canton: 'TG' , name:''},
  {canton: 'UR' , name:''},
  {canton: 'VD' , name:''},
  {canton: 'VS' , name:''},
  {canton: 'ZG' , name:'Zug'},
  {canton: 'ZH' , name:'Zürich'},
]

cantonSelections.forEach(cantonSelection => {
  cantonSelection.addEventListener('click', (event) => {
    const element = event.target
    const timeFrame = element.classList[1].includes('24h')
      ? '24h' : element.classList[1].includes('total')
      ? 'total' : 'userSpec' 
    const caseType = element.classList[1].includes('infected')
      ? 'Infektion' : 'Todesfall'
    const canton = event.target.innerHTML

    getData(canton, timeFrame, caseType)
  })
})

const getData = (canton, timeFrame, caseType) => {

  if(timeFrame === '24h'){
    const filteredData = data
      .filter(d => d.Falltyp === caseType)
      .filter(d => d.Datum === "2021-03-01")
    
    const totalCases = filteredData.reduce((acc, cur) => {
      return acc + cur.Count
    }, 0)

    filteredData.forEach(d => {
      const bubble = document.getElementById(`bubble-${d.Kanton}`)

      const size = d.Count / (totalCases/100)

      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`

      const bar = document.getElementById(`bar-${caseType === 'Infektion' ? 'infected' : 'death'}-${d.Kanton}`)

      bar.style.gridRowStart = `${size}`
      console.log(bar)
    })

    console.log('total', totalCases)
    console.log(filteredData)
  }
}