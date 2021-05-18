import { infectedData, deathData } from './dataCleaning.js'

const cantonSelections = document.querySelectorAll('.navbar__canton')
const chartInfected = document.querySelector('.infected-chart')
// const chartDeath = document.querySelector('.death-chart')
const bubbles = document.querySelectorAll('.bubble')
const inputDateFrom = document.getElementById('date-from')
const inputDateTo = document.getElementById('date-to')

const cantons = [
  { abbr: 'AG', name: 'Aargau' },
  { abbr: 'AR', name: 'Appenzell A.' },
  { abbr: 'AI', name: 'Appenzell I.' },
  { abbr: 'BL', name: 'Basel-Land' },
  { abbr: 'BS', name: 'Basel-Stadt' },
  { abbr: 'BE', name: 'Bern' },
  { abbr: 'FR', name: 'Freiburg' },
  { abbr: 'GE', name: 'Genf' },
  { abbr: 'GL', name: 'Glarus' },
  { abbr: 'GR', name: 'Graubünden' },
  { abbr: 'JU', name: 'Jura' },
  { abbr: 'LU', name: 'Luzern' },
  { abbr: 'NE', name: 'Neuenburg' },
  { abbr: 'NW', name: 'Nidwalden' },
  { abbr: 'OW', name: 'Obwalden' },
  { abbr: 'SH', name: 'Schaffhausen' },
  { abbr: 'SZ', name: 'Schwyz' },
  { abbr: 'SO', name: 'Solothurn' },
  { abbr: 'SG', name: 'St.Gallen' },
  { abbr: 'TI', name: 'Tessin' },
  { abbr: 'TG', name: 'Thurgau' },
  { abbr: 'UR', name: 'Uri' },
  { abbr: 'VD', name: 'Waadt' },
  { abbr: 'VS', name: 'Wallis' },
  { abbr: 'ZG', name: 'Zug' },
  { abbr: 'ZH', name: 'Zürich' },
]

const getDataFromCasetype = (caseType) => {
  if (caseType === 'infected') return infectedData
  return deathData
}


//* Interaction with navbar

cantonSelections.forEach(cantonSelection => {
  cantonSelection.addEventListener('click', (event) => {
    const element = event.target
    const timeFrame = element.classList[2].includes('24h')
      ? '24h' : element.classList[2].includes('total')
      ? 'total' : 'userSpec'
    const caseType = element.classList[2].includes('infected')
      ? 'infected' : 'death'
    const canton = element.innerHTML.substr(0,2)

    getData(canton, timeFrame, caseType)
  })
})

const convertDateFormat = (date) => {
  const EUDateFormat = `${date.substr(8,2)}.${date.substr(5,2)}.${date.substr(0,4)}`
  return EUDateFormat
}

const updateUI = (data, selectedCanton, caseType, dateFrom, dateTo) => {
  const highestCount = Math.max(...data.map(d => d.count))

  data.forEach(d => {
    const bubble = document.getElementById(`bubble-${d.canton}`)

    const size = Math.floor(d.count / (highestCount / 100))

    bubble.style.width = `${35 + (size/2)}px`
    bubble.style.height = `${35 + (size/2)}px`
    bubble.style.backgroundColor = 'gray'
    if (bubble.id.includes(selectedCanton)) {
      bubble.style.backgroundColor = 'blue'
    }

    const bubbleCases = bubble.querySelector('.bubble-cases')
    bubbleCases.innerHTML = d.count


    const bar = document.getElementById(`bar-infected-${d.canton}`)

    bar.style.backgroundColor = 'gray'
    if (bar.id.includes(selectedCanton)) {
      bar.style.backgroundColor = 'blue'
    }

    bar.style.height = `${size}%`

    const barCases = bar.querySelector('.bar-cases')
    barCases.innerHTML = d.count >= 1000 ? `${Math.trunc(d.count/1000)}k` : d.count

  })

  const chart = chartInfected

  const chartTitle = chart.querySelector('h2')
  chartTitle.innerHTML = caseType === 'infected'
    ? 'Infizierte'
    : 'Todesfälle'

  const chartDate = chart.querySelector('h3')
  dateFrom = convertDateFormat(dateFrom)
  dateTo = convertDateFormat(dateTo)
  chartDate.innerHTML = `${dateFrom} - ${dateTo}`
}

const getData = (selectedCanton, timeFrame, caseType) => {
  const data = getDataFromCasetype(caseType)

  

  if (timeFrame === '24h') {
    const dateToday = '2021-02-15' //TODO: Replace with today's date

    const filteredData = data
      .filter(d => d.date === dateToday)

    updateUI(filteredData, selectedCanton, caseType, dateToday, dateToday)
  } else if (timeFrame === 'total'){
    const dateFrom = '2020-02-24'
    const dateTo = '2021-02-15' //TODO: Replace with today's date

    const filteredData = data
      .filter(d => d.date === dateTo) 
      .map(d => {
        return {
          ...d,
          count: d.total
        }
      })

    updateUI(filteredData, selectedCanton, caseType, dateFrom, dateTo)
  } else {
    const dateFrom = inputDateFrom.value
    const dateTo = inputDateTo.value

    let filteredData = data.filter(d => {
      return d.date === dateFrom || d.date === dateTo
    })

    filteredData = filteredData
      .map((d, idx) => {
        if(idx %2 === 0) {
          return {
            ...d,
            count: filteredData[idx+1].total - filteredData[idx].total
          }
        }
      })
      .filter(d => d !== undefined) 
    
    updateUI(filteredData, selectedCanton, caseType, dateFrom, dateTo)

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

    updateBarChart(chartInfected, canton)
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
// const deathBars = getBarsInArray(chartDeath)

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