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
      return `<li class="${HTMLclasses.map(HTMLclass => `${HTMLclass}`).join(' ')}">${canton.abbr}</li>`
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

const cantonUL24hInfect       = document.querySelector('.\\32 4h-infected-canton-ul')
const cantonULs24hDeath       = document.querySelector('.\\32 4h-death-canton-ul')
const cantonULsTotalInfect    = document.querySelector('.total-infected-canton-ul')
const cantonULsTotalDeath     = document.querySelector('.total-death-canton-ul')
const cantonULsUserSpecInfect = document.querySelector('.user-spec-infected-canton-ul')
const cantonULsUserSpecDeath  = document.querySelector('.user-spec-death-canton-ul')

populateList(cantonUL24hInfect      , ['navbar__canton', '24h-infected'      ])
populateList(cantonULs24hDeath      , ['navbar__canton', '24h-death'         ])
populateList(cantonULsTotalInfect   , ['navbar__canton', 'total-infected'    ])
populateList(cantonULsTotalDeath    , ['navbar__canton', 'total-death'       ])
populateList(cantonULsUserSpecInfect, ['navbar__canton', 'user-spec-infected'])
populateList(cantonULsUserSpecDeath , ['navbar__canton', 'user-spec-death'   ])