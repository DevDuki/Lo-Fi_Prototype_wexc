const totalCases    = document.querySelectorAll('.total-cases-title');
const infectedCases = document.querySelectorAll('.infected-title');
const deathCases    = document.querySelectorAll('.death-title');

const toggleOnClick = element => {
    element.addEventListener('click', event => {
        event.stopPropagation(); // otherwise we cannot toggle nested ULs
        toggleCollapse(element);
    });
};

totalCases   .forEach(element => toggleOnClick(element));
infectedCases.forEach(element => toggleOnClick(element));
deathCases   .forEach(element => toggleOnClick(element));


const toggleCollapse = (element) => {
    const siblingList = element.nextElementSibling
    const display = siblingList.style.display

    if(display === 'none'){
        siblingList.style.display = 'block'
    } else {
        siblingList.style.display = 'none'
    }
}
