//Main js module, initializes the page and sets eventListeners || Huvudmodul: initierar sidan och hanterar eventlisteners

import {getBody} from "./apiRequests.js"
import {overlay, planetFigures, sunSlice} from "./domElements.js";
import {setPlanetSizes, displayData, hideOverlay} from "./domManipulation.js";



setPlanetSizes()


for (const planet of planetFigures) {
    planet.addEventListener('click', async() => {

        const planetName = planet.getAttribute('alt')
        const planetData = await getBody(planetName)

        displayData(planetData)
        
    })
}

sunSlice.addEventListener('click', async() => {
    
    const sunData = await getBody('Solen')

    displayData(sunData)

})


overlay.modal.addEventListener('click', () => {
    hideOverlay()
})