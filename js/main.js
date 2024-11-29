//Main js module

import {getPlanet} from "./apiRequests.js"
import {overlay, planetFigures} from "./domElements.js";
import {displayPlanetData, hideOverlay, setPlanetSizes} from "./domManipulation.js";



setPlanetSizes()


for (const planet of planetFigures) {
    planet.addEventListener('click', async() => {

        const planetName = planet.getAttribute('alt')
        const planetData = await getPlanet(planetName)

        displayPlanetData(planetData)
        
    })
}


overlay.modal.addEventListener('click', () => {
    hideOverlay()
})