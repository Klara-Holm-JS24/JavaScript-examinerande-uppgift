//Module containing all code that makes changes in the DOM

import { getSolarSystem } from "./apiRequests.js"
import { overlay, planetFigures, planetSlices } from "./domElements.js"
import { getColorVar, stringifyBigNumber } from "./misc.js"


//Function that makes the relative sizing of the planet figures true-to-life
const setPlanetSizes = async() => {

    //Get array of planets by first getting our solar system array (through api request), then making a "sub-array" excluding the sun
    const solarSystem = await getSolarSystem()
    const planets = solarSystem.slice(1)

    //Looping with variables instead of "for of" since we want to simultaneously access the same index of 2 different arrays
    for (let i = 0; i < planets.length; i++) {

        const planetElement = planetFigures[i] //planetFigures imported from domElements.js

        const planetData = planets[i]
        const planetDiameter = planetData.circumference / Math.PI //Calculates the planet's diameter based on circumference data

        planetElement.style.flex = planetDiameter //Sets the planet's relative size based on its diameter
    }
}


//Self-explanatory I hope
const hideOverlay = () => {
    overlay.modal.classList.add('hidden')
}
const showOverlay = () => {
    overlay.modal.classList.remove('hidden')
}



const displayData = (spaceObject) => {   

    console.log('Displaying the data of ' + spaceObject.name);
    

    //Displaying a number of selected datapoints from the  to their belonging HTML element
    overlay.title.textContent = spaceObject.name
    overlay.subTitle.textContent = spaceObject.latinName

    overlay.description.textContent = spaceObject.desc

    const circString = stringifyBigNumber(spaceObject.circumference) + ' km'
    const distString = stringifyBigNumber(spaceObject.distance) + ' km'

    overlay.circumference.textContent = circString
    overlay.distance.textContent = distString

    //Sometimes max temperature and min temperature are the same, then we want to show a different stat instead of 2 temps
    if (spaceObject.temp.day == spaceObject.temp.night) {

        console.log('Displaying temperature and rotational period since daytime and nighttime temperatures are the same');
        

        //Replacing max temperature with temperature
        overlay.maxTempTitle.textContent = 'Temperatur'
        overlay.maxTemp.textContent = spaceObject.temp.day + '°C'

        //Replacing the display of min temperature with rotational period
        overlay.minTempTitle.textContent = 'Rotationstid'

        const rotationString = stringifyBigNumber(spaceObject.rotation)  + ' dagar'
        overlay.minTemp.textContent = rotationString
        
    } else {

        //If max and min temp are different they're shown as usual

        console.log('Displaying max and min temperature since daytime and nighttime temperatures differ');

        overlay.maxTempTitle.textContent = 'Max Temperatur'
        overlay.maxTemp.textContent = spaceObject.temp.day + '°C'

        overlay.minTempTitle.textContent = 'Min Temperatur'
        overlay.minTemp.textContent = spaceObject.temp.night + '°C' 
    }



    //Displaying the space object's moons:

    overlay.moonsList.innerHTML = '' //First empty the current <ul>

    let displayedMoons = [] //Declaring a variable to check for double moons (api returns 3 different "Titan" for Saturn)

    //Iterating through the array of moons that's in the api data
    for (const moon of spaceObject.moons) {

        if (displayedMoons.includes(moon)) {

            console.log(`Detected double: multiple items contain ${moon}`)
            continue //Skips over 

        }

        //Create a <li> element containing name of the current iteration's moon
        const newListItem = document.createElement('li')
        newListItem.textContent = moon

        //Adding that element to the moons <ul>
        overlay.moonsList.appendChild(newListItem)
   
        displayedMoons.push(moon) //Once a moon has been added to the html, add it's name to the list that checks doubles
   
    }

    //If the space object has no moons to display, a message about the lack of moons is displayed instead
    if (spaceObject.moons.length == 0) {
        overlay.moonsList.textContent = `${spaceObject.name} har inga månar.`
    }


    //Setting the background color of all the "planet slices" at the left side of the screen to be the color of the planet
    const colorVar = getColorVar(spaceObject)

    for (const key in planetSlices) {
        planetSlices[key].style.backgroundColor = `var(${colorVar})`
    }
    
    
    //Setting the opacity of the planet slices depending on what space object is displayed
    switch(spaceObject.name) {
        case "Solen":
            setSliceOpacity(0.9, 0.8, 0.75) //Sun gets a powerful but not solid glow that slightly decreases towards the outer layers
            break
        case "Jorden":
            setSliceOpacity(1, 0.2, 0.1) //Earth gets a solid inner layer and very weak outer ones (representing atmosphere)
            break
        case "Merkurius":
        case "Venus":
        case "Mars":
            setSliceOpacity(1, 0, 0) //Rest of the stone planets get a solid inner layer and no outer ones (no atmosphere)
            break
        case "Jupiter":
        case "Saturnus": 
        case "Uranus":
        case "Neptunus":
            setSliceOpacity(0.6, 0.4, 0.2) //Gas giants get a see-through inner layer and decreasing outer ones
            break
        default:
            console.log('Failed to set slice opacity for ' + spaceObject.name); 
    }
    

    //After everything's been prepared, we show the overlay
    showOverlay()
}


//Local function only used by displayData
//Accepts 3 number values between 0 and 1 and sets the opacity of the 3 "slice layers" at the left side of screen to those values
const setSliceOpacity = (innerValue, middleValue, outerValue) => {

    //Exits the function early if all arguments aren't number values, or if the number values are outside of 0-1
    if (![innerValue, middleValue, outerValue].every(value => typeof value == 'number')) {
    
        console.log('Setting slice opacity failed,', innerValue, middleValue, outerValue, 'are not all number values')
        return   
    
    } else if (![innerValue, middleValue, outerValue].every(value => value >= 0 && value <= 1)) {

        console.log('Setting slice opacity failed,', innerValue, middleValue, outerValue, 'are not all valid opacity values')
        return
    
    }

    planetSlices.inner.style.opacity = innerValue
    planetSlices.middle.style.opacity = middleValue
    planetSlices.outer.style.opacity = outerValue

    console.log('Slice opacity was set to', innerValue, middleValue, outerValue)
}



export {setPlanetSizes, showOverlay, hideOverlay, displayData}