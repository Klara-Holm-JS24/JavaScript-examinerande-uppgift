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

    displayElements.circumference.textContent = planetData.circumference
    displayElements.distance.textContent = planetData.distance

    displayElements.maxTemp.textContent = planetData.temp.day
    displayElements.minTemp.textContent = planetData.temp.night  

    for (const moon of planetData.moons) {
        
        const newListItem = document.createElement('li')
        newListItem.textContent = moon

        displayElements.moonList.appendChild(newListItem)
    }

    
    const planetSlices = document.querySelectorAll('.planet-slice .slice-layer')
    const colorVar = `var(--${planetData.name.toLowerCase()})`

    for (const slice of planetSlices) {
        slice.style.backgroundColor = colorVar
    }


    showOverlay()
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