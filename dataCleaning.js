import rawInfectedData from './data/infected.js'
import rawDeathData from './data/deaths.js'

const cantonInfectedData = rawInfectedData
  .filter(d => d.geoRegion !== 'CH')
  .filter(d => d.geoRegion !== 'CHFL')
  .filter(d => d.geoRegion !== 'FL')

const infectedData = cantonInfectedData.map(data => {
  return {
    canton: data.geoRegion,
    count: data.entries,
    date: data.datum,
    caseType: 'infected'
  }
})


const cantonDeathData = rawDeathData
  .filter(d => d.geoRegion !== 'CH')
  .filter(d => d.geoRegion !== 'CHFL')
  .filter(d => d.geoRegion !== 'FL')

const deathData = cantonDeathData.map(data => {
  return {
    canton: data.geoRegion,
    count: data.entries,
    date: data.datum,
    caseType: 'death'
  }
})


export { infectedData, deathData }