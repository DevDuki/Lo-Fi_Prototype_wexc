const totalCases = document.querySelectorAll('.total-cases-title')
const infectedCases = document.querySelectorAll('.infected-title')
const deathCases = document.querySelectorAll('.death-title')

totalCases.forEach(total => {
    total.addEventListener('click', (e) => {
        e.stopPropagation()

        toggleCollapse(e.target)
    })
})


infectedCases.forEach(total => {
    total.addEventListener('click', (e) => {
        e.stopPropagation()

        toggleCollapse(e.target)
    })
})


deathCases.forEach(total => {
    total.addEventListener('click', (e) => {
        e.stopPropagation()

        toggleCollapse(e.target)
    })
})

const toggleCollapse = (element) => {
    const siblingList = element.nextElementSibling
    const display = siblingList.style.display

    if(display === 'none'){
        siblingList.style.display = 'block'
    } else {
        siblingList.style.display = 'none'
    }
}