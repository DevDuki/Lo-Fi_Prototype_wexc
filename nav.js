import { infectedData, deathData } from './dataCleaning.js'

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

const populateList = (ul, HTMLclasses) => {
  ul.innerHTML = `
    ${cantons.map(canton => {
      return `<li class="${HTMLclasses.map(HTMLclass => `${HTMLclass}`).join(' ')} ${canton.abbr}">${canton.abbr}</li>`
    }).join('')}
  `
  /* What this function does...
    <[ul]>
      <li class="[HTMLClasses]">AG</li>
      <li class="[HTMLClasses]">AR</li>
      <li class="[HTMLClasses]">AI</li>
      ...
    </[ul]>
  */
}

const getCasesAmountIn24h = (data) => {
  return data
    .filter(d => d.date === '2021-02-15') //TODO Replace with today's date
    .map(d => {
      return {
        total: d.count
      }
    })
    .reduce((acc, cur) => acc + cur.total, 0)
}

const getCasesAmountInTotal = (data) => {
  return data
    .filter(d => d.date === '2021-02-15') //TODO Replace with today's date
    .map(d => {
      return {
        total: d.total
      }
    })
    .reduce((acc, cur) => acc + cur.total, 0)
}

const getCasesAmountInUserSpec = (data, dateFrom, dateTo) => {
  let filteredData = data.filter(d => {
    return d.date === dateFrom || d.date === dateTo
  })

  const totalAmount = filteredData
    .map((d, idx) => {
      if(idx %2 === 0) {
        return {
          total: filteredData[idx+1].total - filteredData[idx].total
        }
      }
    })
    .filter(d => d !== undefined)
    .reduce((acc, cur) => acc + cur.total, 0)

  return totalAmount
}

const getCasesAmountInCanton24h = (canton, data) => {
  const infectedDataInDate = data
  .filter(d => d.date === '2021-02-15')

  const amountInCanton = infectedDataInDate
    .find(d => d.canton === canton.innerHTML.substr(0,2))
    .count

  return amountInCanton
}

const getCasesAmountInCantonTotal = (canton, data) => {
  const infectedDataInDate = data
  .filter(d => d.date === '2021-02-15')

  const amountInCanton = infectedDataInDate
    .find(d => d.canton === canton.innerHTML.substr(0,2))
    .total

  return amountInCanton
}

const getCasesAmountInCantonUserSpec = (canton, data, dateFrom, dateTo) => {
  const infectedDataInDateAndCanton = data
    .filter(d => d.date === dateFrom || d.date === dateTo)
    .filter(d => d.canton === canton.innerHTML.substr(0,2))

  const amount = infectedDataInDateAndCanton[1].total - infectedDataInDateAndCanton [0].total
  return amount
}

const addDataToList = (ul, dateFrom = '2020-02-24', dateTo = '2021-02-15' /* TODO: Replace with today's date */) => {
  const totalListTitle = ul.querySelector('.total-cases-title')
  const infectedListTitle = ul.querySelector('.infected-title')
  const deathListTitle = ul.querySelector('.death-title')
  const infectedCantons = ul.querySelectorAll('.canton-infected')
  const deathCantons = ul.querySelectorAll('.canton-death')

  let dateRange = 'total'

  if(dateFrom !== '2020-02-24' || dateTo !== '2021-02-15'){
    dateRange = 'userSpec'
    if(dateFrom === dateTo) dateRange = '24h'
  }

  const totalInfectedInDateRange = dateRange === '24h' 
   ? getCasesAmountIn24h(infectedData) : dateRange === 'total'
   ? getCasesAmountInTotal(infectedData) : getCasesAmountInUserSpec(infectedData, dateFrom, dateTo)

  const totalDeathInDateRange = dateRange === '24h' 
    ? getCasesAmountIn24h(deathData) : dateRange === 'total'
    ? getCasesAmountInTotal(deathData) : getCasesAmountInUserSpec(deathData, dateFrom, dateTo)

  totalListTitle.innerHTML = `Total Fälle (${totalInfectedInDateRange + totalDeathInDateRange})`
  infectedListTitle.innerHTML = `Infizierte (${totalInfectedInDateRange})`
  deathListTitle.innerHTML = `Todesfälle (${totalDeathInDateRange})`

  infectedCantons.forEach(canton => {
    const amountCasesInCanton = dateRange === '24h' 
      ? getCasesAmountInCanton24h(canton, infectedData) : dateRange === 'total'
      ? getCasesAmountInCantonTotal(canton, infectedData) : getCasesAmountInCantonUserSpec(canton, infectedData, dateFrom, dateTo)

    canton.innerHTML = `${canton.classList[3]} (${amountCasesInCanton})`
  })

  deathCantons.forEach(canton => {
    const amountCasesInCanton = dateRange === '24h' 
      ? getCasesAmountInCanton24h(canton, deathData) : dateRange === 'total'
      ? getCasesAmountInCantonTotal(canton, deathData) : getCasesAmountInCantonUserSpec(canton, deathData, dateFrom, dateTo)

    canton.innerHTML = `${canton.classList[3]} (${amountCasesInCanton})`
  })
}



// Fill the lists with all cantons and add classes to the list items
const cantonUL24hInfect       = document.querySelector('.\\32 4h-infected-canton-ul')
const cantonULs24hDeath       = document.querySelector('.\\32 4h-death-canton-ul')
const cantonULsTotalInfect    = document.querySelector('.total-infected-canton-ul')
const cantonULsTotalDeath     = document.querySelector('.total-death-canton-ul')
const cantonULsUserSpecInfect = document.querySelector('.user-spec-infected-canton-ul')
const cantonULsUserSpecDeath  = document.querySelector('.user-spec-death-canton-ul')

populateList(cantonUL24hInfect      , ['navbar__canton', 'canton-infected',  '24h-infected'      ])
populateList(cantonULs24hDeath      , ['navbar__canton', 'canton-death',  '24h-death'         ])
populateList(cantonULsTotalInfect   , ['navbar__canton', 'canton-infected',  'total-infected'    ])
populateList(cantonULsTotalDeath    , ['navbar__canton', 'canton-death',  'total-death'       ])
populateList(cantonULsUserSpecInfect, ['navbar__canton', 'canton-infected',  'user-spec-infected'])
populateList(cantonULsUserSpecDeath , ['navbar__canton', 'canton-death',  'user-spec-death'   ])



// Add amount of cases to the nav elements
const last24hList = document.getElementById('24h-list')
const totalList = document.getElementById('total-list')
const userSpecList = document.getElementById('user-spec-list')
const inputDateFrom = document.getElementById('date-from')
const inputDateTo = document.getElementById('date-to')

addDataToList(last24hList, '2021-02-15', '2021-02-15') //TODO Replace both dates with today's date
addDataToList(totalList) //TODO Replace the later date with today's date
addDataToList(userSpecList, inputDateFrom.value, inputDateTo.value)

inputDateFrom.addEventListener('change', () => {
  addDataToList(userSpecList, inputDateFrom.value, inputDateTo.value)
})

inputDateTo.addEventListener('change', () => {
  addDataToList(userSpecList, inputDateFrom.value, inputDateTo.value)
})