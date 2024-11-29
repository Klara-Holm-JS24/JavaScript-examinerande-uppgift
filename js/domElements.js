//Module containing all DOM elements that we at any point access in our js

const planetFigures = document.querySelectorAll('.solar-system__planet')
const sunSlice = document.querySelector('.sun-slice')

//
const overlay = {
    modal: document.querySelector('.overlay'),
    title: document.querySelector('.overlay__title'),
    subTitle: document.querySelector('.overlay__subtitle'),
    description: document.querySelector('.overlay__pl-desc'),
    circumference: document.querySelector('.overlay__pl-circ'),
    distance: document.querySelector('.overlay__pl-dist'),
    maxTemp: document.querySelector('.overlay__pl-max-temp'),
    minTemp: document.querySelector('.overlay__pl-min-temp'),
    moonList: document.querySelector('.overlay__moons-list')        
}

const planetSlices = {
    outer: document.querySelector('.pl-slice__layer--outer'),
    middle: document.querySelector('.pl-slice__layer--middle'),
    inner: document.querySelector('.pl-slice__layer--inner')
}



export {planetFigures, sunSlice, overlay, planetSlices}