//Module that handles api requests || Modul för att hantera api requests


const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com"

const getApiKey = async() => {
    const url = baseUrl + "/keys"
    const options = {
        method: "POST"
    }

    try {
        const response = await fetch(url, options)
        const result = await response.json()
        const key = result.key

        return key

    } catch(error) {
        console.log(error)
    }
}

const apiKey = await getApiKey()


export const getSolarSystem = async() => {
    const url = baseUrl + "/bodies"
    const options = {
        method: "GET",
        headers: {"x-zocom": apiKey}
    }

    try {
        const response = await fetch(url, options)
        const result = await response.json()
        const bodies = result.bodies
        
        return bodies
    } catch (error) {
        console.log(error)
    }
}

export const getPlanet = async(name) => {
    const solarSystem = await getSolarSystem()
    console.log(solarSystem)
    return solarSystem.find(planet => planet.name === name)
}