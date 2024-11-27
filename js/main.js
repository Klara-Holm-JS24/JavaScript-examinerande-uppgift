//Main js module, contains all code in which 

import {getSolarSystem} from "./apiRequests.js"
import {displayPlanetData, hideOverlay, setPlanetSizes} from "./domManipulation.js";

const planetElements = document.querySelectorAll('.planet')
const infoOverlay = document.querySelector('.pl-overlay') 



const getPlanet = async(name) => {
    const solarSystem = await getSolarSystem()
    return solarSystem.find(planet => planet.name === name)
}

await setPlanetSizes()

infoOverlay.addEventListener('click', () => {
    hideOverlay()
})

for (const planet of planetElements) {
    planet.addEventListener('click', async() => {

        const planetName = planet.getAttribute('name')
        const planetData = await getPlanet(planetName)

        displayPlanetData(planetData)
        
    })
}