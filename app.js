import { infectedData, deathData } from './dataCleaning.js'
import getDatesBetweenDates from './util/dateUtil.js'

const cantonSelections = document.querySelectorAll('.navbar__canton')
const chartInfected = document.querySelector('.infected-chart')
const chartDeath = document.querySelector('.death-chart')
const bubbles = document.querySelectorAll('.bubble')
const inputDateFrom = document.getElementById('date-from')
const inputDateTo = document.getElementById('date-to')

const coordinates = [
  { canton: 'AG', name: 'Aargau' },
  { canton: 'AR', name: 'Appenzell A.' },
  { canton: 'AI', name: 'Appenzell I.' },
  { canton: 'BL', name: 'Basel-Land' },
  { canton: 'BS', name: 'Basel-Stadt' },
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

const getDataFromCasetype = (caseType) => {
  if (caseType === 'infected') return infectedData
  return deathData
}


//* Interaction with navbar

cantonSelections.forEach(cantonSelection => {
  cantonSelection.addEventListener('click', (event) => {
    const element = event.target
    const timeFrame = element.classList[1].includes('24h')
      ? '24h' : element.classList[1].includes('total')
      ? 'total' : 'userSpec'
    const caseType = element.classList[1].includes('infected')
      ? 'infected' : 'death'
    const canton = element.innerHTML

    getData(canton, timeFrame, caseType)
  })
})

const updateUI = (data, selectedCanton, caseType) => {
  const highestCount = Math.max(...data.map(d => d.count))
  console.log(data)

  data.forEach(d => {
    const bubble = document.getElementById(`bubble-${d.canton}`)

    const size = Math.floor(d.count / (highestCount / 100))

    bubble.style.width = `${15 + size}px`
    bubble.style.height = `${15 + size}px`
    bubble.style.backgroundColor = 'gray'
    if (bubble.id.includes(selectedCanton)) {
      bubble.style.backgroundColor = 'blue'
    }

    const bubbleCases = bubble.querySelector('.bubble-cases')
    bubbleCases.innerHTML = d.count


    const bar = document.getElementById(`bar-${caseType === 'infected' ? 'infected' : 'death'}-${d.canton}`)

    if (caseType === 'infected') {
      chartInfected.style.display = 'block'
      chartDeath.style.display = 'none'
    } else {
      chartInfected.style.display = 'none'
      chartDeath.style.display = 'block'
    }
    bar.style.backgroundColor = 'gray'
    if (bar.id.includes(selectedCanton)) {
      bar.style.backgroundColor = 'blue'
    }
    bar.style.gridRowStart = `${100 - size}`

    const barCases = bar.querySelector('.bar-cases')
    barCases.innerHTML = d.count

  })
}

const getData = (selectedCanton, timeFrame, caseType) => {
  const data = getDataFromCasetype(caseType)

  if (timeFrame === '24h') {
    const filteredData = data
      .filter(d => d.date === '2021-02-15') //TODO: Replace with today's date

    updateUI(filteredData, selectedCanton, caseType)
  } else if (timeFrame === 'total'){
    const filteredData = data
      .filter(d => d.date === '2021-02-15') //TODO: Replace with today's date
      .map(d => {
        return {
          ...d,
          count: d.total
        }
      })

    updateUI(filteredData, selectedCanton, caseType)
  } else {
    const startDate = inputDateFrom.value
    const endDate = inputDateTo.value

    const dates = getDatesBetweenDates(startDate, endDate)

    const filteredData = data.filter(d => {
      //TODO: Filter data to the date range and reduce the total count of incidence
    })
    console.log(dates)
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


// Chart
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