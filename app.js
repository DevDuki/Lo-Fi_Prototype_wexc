import data from './data.js'

const cantonSelections = document.querySelectorAll('.navbar__canton')
const chartInfected = document.querySelector('.infected-chart')
const chartDeath = document.querySelector('.death-chart')
const bubbles = document.querySelectorAll('.bubble')

const coordinates = [
  { canton: 'AG', name: '' },
  { canton: 'AA', name: '' },
  { canton: 'AI', name: '' },
  { canton: 'BL', name: '' },
  { canton: 'BS', name: 'Basel' },
  { canton: 'BE', name: 'Bern' },
  { canton: 'FR', name: 'Freiburg' },
  { canton: 'GE', name: 'Genf' },
  { canton: 'GL', name: 'Glarus' },
  { canton: 'GR', name: 'Graubünden' },
  { canton: 'JU', name: 'Jura' },
  { canton: 'LU', name: 'Luzern' },
  { canton: 'NE', name: 'Neuenburg' },
  { canton: 'NW', name: 'Nidwalden' },
  { canton: 'OW', name: 'Obwalden' },
  { canton: 'SH', name: 'Schaffhausen' },
  { canton: 'SZ', name: 'Schwyz' },
  { canton: 'SO', name: 'Solothurn' },
  { canton: 'SG', name: 'St.Gallen' },
  { canton: 'TI', name: 'Tessin' },
  { canton: 'TG', name: 'Thurgau' },
  { canton: 'UR', name: 'Uri' },
  { canton: 'VD', name: 'Waadt' },
  { canton: 'VS', name: 'Wallis' },
  { canton: 'ZG', name: 'Zug' },
  { canton: 'ZH', name: 'Zürich' },
]



//* Interaction with navbar

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

  if (timeFrame === '24h') {
    const filteredData = data
      .filter(d => d.Falltyp === caseType)
      .filter(d => d.Datum === "2021-03-01")

    const totalCases = filteredData.reduce((acc, cur) => {
      return acc + cur.Count
    }, 0)

    filteredData.forEach(d => {
      const bubble = document.getElementById(`bubble-${d.Kanton}`)

      const size = Math.floor(d.Count / (totalCases / 100))

      bubble.style.width = `${15 + size}px`
      bubble.style.height = `${15 + size}px`
      bubble.style.backgroundColor = 'gray'
      if (bubble.id.includes(canton)) {
        bubble.style.backgroundColor = 'blue'
      }

      const bubbleCases = bubble.querySelector('.bubble-cases')
      bubbleCases.innerHTML = d.Count


      const bar = document.getElementById(`bar-${caseType === 'Infektion' ? 'infected' : 'death'}-${d.Kanton}`)

      if (caseType === 'Infektion') {
        chartInfected.style.display = 'block'
        chartDeath.style.display = 'none'
      } else {
        chartInfected.style.display = 'none'
        chartDeath.style.display = 'block'
      }
      bar.style.backgroundColor = 'gray'
      if (bar.id.includes(canton)) {
        bar.style.backgroundColor = 'blue'
      }
      bar.style.gridRowStart = `${100 - size}`

      const barCases = bar.querySelector('.bar-cases')
      barCases.innerHTML = d.Count

    })
  }
}




//* Interaction with the map

bubbles.forEach(bubble => {
  bubble.addEventListener('click', (event) => {
    const selectedBubble = event.currentTarget
    const canton = selectedBubble.querySelector('.bubble-canton').innerHTML

    bubbles.forEach(bubble => {
      bubble.style.backgroundColor = 'gray'
    })

    selectedBubble.style.backgroundColor = 'blue'

    if (chartInfected.style.display === 'none') {
      updateBarChart(chartDeath, canton)
    } else {
      updateBarChart(chartInfected, canton)
    }
  })
})

const updateBarChart = (chartContainer, selectedCanton) => {
  const bars = chartContainer.querySelector('.chart').children
  const barChilds = [...bars]
  barChilds.forEach(bar => {
    bar.style.backgroundColor = 'gray'

    if (bar.id.endsWith(selectedCanton)) {
      bar.style.backgroundColor = 'blue'
    }
  })
}




//* Interaction with chart


// Infected Chart
const getBarsInArray = (parent) => {
  const bars = parent.querySelector('.chart').children
  return [...bars]
}

const infectedBars = getBarsInArray(chartInfected)
const deathBars = getBarsInArray(chartDeath)

const handleBarChartSelection = (bars, event) => {
  const selectedBar = event.currentTarget
  const canton = selectedBar.querySelector('.bar-canton').innerHTML

  bars.forEach(bar => {
    bar.style.backgroundColor = 'gray'
  })

  selectedBar.style.backgroundColor = 'blue'

  bubbles.forEach(bubble => {
    bubble.style.backgroundColor = 'gray'

    if (bubble.id.endsWith(canton)) {
      bubble.style.backgroundColor = 'blue'
    }
  })
}

infectedBars.forEach(bar => {
  bar.addEventListener('click', (event) => {
    handleBarChartSelection(infectedBars, event)
  })
})

deathBars.forEach(bar => {
  bar.addEventListener('click', (event) => {
    handleBarChartSelection(deathBars, event)
  })
})