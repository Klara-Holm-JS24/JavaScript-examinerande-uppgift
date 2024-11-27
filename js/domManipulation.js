//Module containing all code that changes the DOM || Modul med all kod som ändrar i DOM-trädet

import {getSolarSystem } from "./apiRequests.js"


const displayPlanetData = (planetData) => {

    //Setting all planet display elements as properties of an object as to easily access each element in a uniform way
    const displayElements = {
        name: document.querySelector('.pl-name'),
        latinName: document.querySelector('.pl-latin-name'),
        description: document.querySelector('.pl-desc'),
        circumference: document.querySelector('.pl-circ'),
        distance: document.querySelector('.pl-distance'),
        maxTemp: document.querySelector('.pl-max-temp'),
        minTemp: document.querySelector('.pl-min-temp'),
        moonList: document.querySelector('.pl-moon-list')        
    }

    console.log(displayElements)

    //Displaying a number of selected planet datapoints to their belonging HTML element
    displayElements.name.textContent = planetData.name
    displayElements.latinName.textContent = planetData.latinName

    displayElements.description.textContent = planetData.desc

    const circString = stringifyBigNumber(planetData.circumference) + ' km'
    const distString = stringifyBigNumber(planetData.distance) + ' km'

    displayElements.circumference.textContent = circString
    displayElements.distance.textContent = distString

    displayElements.maxTemp.textContent = planetData.temp.day + ' °C'
    displayElements.minTemp.textContent = planetData.temp.night + ' °C' 

    displayElements.moonList.innerHTML = ''

    //Adding moon data is a bit more complex, partially because the data is not a string but an array that needs to be turned in to list items
    //Also because SOME astral bodies (*cough* saturn *cough*) apparently have 3 moons named Titan, so would you look at that...
    //Aka we need to check for doubles and make sure they aren't entered multiple times

    let displayedMoons = []

    for (const moon of planetData.moons) {
        if (displayedMoons.includes(moon)) {
            console.log(`Detected double: multiple items contain ${moon}`)
            continue //Skips current iteration
        }

        const newListItem = document.createElement('li')
        newListItem.textContent = moon

        displayElements.moonList.appendChild(newListItem)
   
        displayedMoons.push(moon)
   
    }

    
    const planetSlices = document.querySelectorAll('.planet-slice .slice-layer')
    const colorVar = `var(--${planetData.name.toLowerCase()})`

    for (const slice of planetSlices) {
        slice.style.backgroundColor = colorVar
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

    //Get array of all planet <figure>-elements from our HTML document
    const planetFigures = document.querySelectorAll('figure.planet')
    console.log(planetFigures)

    //Get array of planets by first getting our solar system array (through api request), then removing it's first item (the sun)
    const solarSystem = await getSolarSystem()
    const planets = solarSystem.slice(1)
    console.log(planets)

    //Looping with variables instead of "for of" since we want to access the same index of 2 different arrays
    for (let i = 0; i < planets.length; i++) {

        const figElement = planetFigures[i]

        const planetData = planets[i]
        const planetDiameter = planetData.circumference / Math.PI

        figElement.style.flex = planetDiameter
    }
}

const hideOverlay = () => {
    document.querySelector('.pl-overlay').classList.add('hidden')
}

const showOverlay = () => {
    document.querySelector('.pl-overlay').classList.remove('hidden')
}

export{setPlanetSizes, displayPlanetData, hideOverlay}