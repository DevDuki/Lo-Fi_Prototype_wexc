import data from './data.js'

const cantons = [...new Set(data.map(d => d.Kanton))]

const infectedMarchData = data.filter(d => d.Falltyp === 'Infektion').filter(d => d.Datum === '2021-03-01')


//constants
const TROW = 'tr',
      TDATA = 'td';

const chart = document.createElement('div');
//create the chart canvas
const barchart = document.createElement('table');
//create the title row
const titlerow = document.createElement(TROW);
//create the title data
const titledata = document.createElement(TDATA);
//make the colspan to number of records
titledata.setAttribute('colspan', cantons.length);
titledata.setAttribute('class', 'charttitle');
titledata.innerText = 'Infizierte';
titlerow.appendChild(titledata);
barchart.appendChild(titlerow);
chart.appendChild(barchart);

//create the bar row
const barrow = document.createElement(TROW);

//lets add data to the chart
infectedMarchData.forEach(data => {
  barrow.setAttribute('class', 'bars');
  const bardata = document.createElement(TDATA);
  const bar = document.createElement('div');
  const cantonName = data.Kanton;
  bar.style.background = 'red'
  bar.style.height = data.Count.toString() + "px"
  bardata.innerText = data.Count + '\n' + cantonName
  bardata.appendChild(bar);
  barrow.appendChild(bardata)
})
// for (let i = 0; i < chartjson.data.length; i++) {
//   barrow.setAttribute('class', 'bars');
//   var prefix = chartjson.prefix || '';
//   //create the bar data
//   var bardata = document.createElement(TDATA);
//   var bar = document.createElement('div');
//   bar.setAttribute('class', colors[i]);
//   bar.style.height = chartjson.data[i][chartjson.ykey] + prefix;
//   bardata.innerText = chartjson.data[i][chartjson.ykey] + prefix;
//   bardata.appendChild(bar);
//   barrow.appendChild(bardata);
// }

//create legends
const legendrow = document.createElement(TROW);
const legend = document.createElement(TDATA);
legend.setAttribute('class', 'legend');
legend.setAttribute('colspan', cantons.length);

cantons.forEach(canton => {
  const legbox = document.createElement('span');
  legbox.setAttribute('class', 'legbox');
  const barname = document.createElement('span');
  const bartext = document.createElement('span');
  bartext.innerText = canton
  legbox.appendChild(barname);
  legbox.appendChild(bartext);
  legend.appendChild(legbox);
})


//add legend data
// for (var i = 0; i < chartjson.data.length; i++) {
//   var legbox = document.createElement('span');
//   legbox.setAttribute('class', 'legbox');
//   var barname = document.createElement('span');
//   barname.setAttribute('class', colors[i] + ' xaxisname');
//   var bartext = document.createElement('span');
//   bartext.innerText = chartjson.data[i][chartjson.xkey];
//   legbox.appendChild(barname);
//   legbox.appendChild(bartext);
//   legend.appendChild(legbox);
// }

barrow.appendChild(legend);
barchart.appendChild(barrow);
barchart.appendChild(legendrow);
chart.appendChild(barchart);
document.getElementById('chart').innerHTML = chart.outerHTML;