//Module containing all code that changes the DOM || Modul med all kod som ändrar i DOM-trädet

import {getSolarSystem } from "./apiRequests.js"
import { overlay, planetFigures, planetSlices } from "./domElements.js"


const displayPlanetData = (planetData) => {    

    //Displaying a number of selected planet datapoints to their belonging HTML element
    overlay.title.textContent = planetData.name
    overlay.subTitle.textContent = planetData.latinName

    overlay.description.textContent = planetData.desc

    const circString = stringifyBigNumber(planetData.circumference) + ' km'
    const distString = stringifyBigNumber(planetData.distance) + ' km'

    overlay.circumference.textContent = circString
    overlay.distance.textContent = distString

    overlay.maxTemp.textContent = planetData.temp.day + ' °C'
    overlay.minTemp.textContent = planetData.temp.night + ' °C' 

    overlay.moonList.innerHTML = ''

    //Adding moon data is a bit more complex, partially because the data is not a string but an array that needs to be turned into list items
    //Also because SOME astral bodies (*cough* saturn *cough*) apparently have 3 moons named Titan, so would you look at that...
    //In other words we need to check for doubles and make sure they aren't entered multiple times

    let displayedMoons = []

    for (const moon of planetData.moons) {
        if (displayedMoons.includes(moon)) {
            console.log(`Detected double: multiple items contain ${moon}`)
            continue //Skips current iteration
        }

        const newListItem = document.createElement('li')
        newListItem.textContent = moon

        overlay.moonList.appendChild(newListItem)
   
        displayedMoons.push(moon)
   
    }

    
    const colorVar = `var(--${planetData.name.toLowerCase()})`
    
    for (const key in planetSlices) {
        planetSlices[key].style.backgroundColor = colorVar
    }
    
    if (['Merkurius', 'Venus', 'Mars'].includes(planetData.name)) {
        planetSlices.outer.style.opacity = 0
        planetSlices.middle.style.opacity = 0
    } else {
        planetSlices.outer.style.opacity = 0.5
        planetSlices.middle.style.opacity = 0.75
    }

    


    showOverlay()
}

const stringifyBigNumber = (number) => {
    let returnString = ''

    const numberString = number.toString()

    for (let i = 0; i < numberString.length; i++) {
        returnString += numberString[i]

        if ((numberString.length - i)%3 == 1 && numberString.length - i != 1) {
            returnString += ' '
        } 
    }

    return returnString
}

const setPlanetSizes = async() => {

    //Get array of planets by first getting our solar system array (through api request), then removing it's first item (the sun)
    const solarSystem = await getSolarSystem()
    const planets = solarSystem.slice(1)

    //Looping with variables instead of "for of" since we want to access the same index of 2 different arrays
    for (let i = 0; i < planets.length; i++) {

        const figElement = planetFigures[i] //planetFigures imported from domElements.js

        const planetData = planets[i]
        const planetDiameter = planetData.circumference / Math.PI

        figElement.style.flex = planetDiameter
    }
}

const hideOverlay = () => {
    overlay.modal.classList.add('hidden')
}

const showOverlay = () => {
    overlay.modal.classList.remove('hidden')
}

export{setPlanetSizes, displayPlanetData, hideOverlay}