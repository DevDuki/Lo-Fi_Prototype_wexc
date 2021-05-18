const totalCases    = document.querySelectorAll('.total-cases-title');
const infectedCases = document.querySelectorAll('.infected-title');
const deathCases    = document.querySelectorAll('.death-title');

const toggleCollapse  = element => {
    const siblingList = element.nextElementSibling; // next sibling is a nested list
    const display     = siblingList.style.display;
    const opacity     = siblingList.style.opacity;

    siblingList.style.display =
        'none' === display
            ? 'block'
            : 'none';

    setTimeout(() => {
        siblingList.style.opacity =
            '1' === opacity
                ? '0'
                : '1'
    }, 200)
    
}

const toggleOnClick = elements =>
    elements.forEach( element =>
        element.addEventListener('click', event => {
            event.stopPropagation(); // otherwise we cannot toggle nested ULs
            toggleCollapse(element);
        })
    )
;

toggleOnClick(totalCases   );
toggleOnClick(infectedCases);
toggleOnClick(deathCases   );



