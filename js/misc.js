//Modal containing 2 functions that don't quite belong in any of the other files but that make the code look a lot cleaner


//Hopefully self-explanatory, returns the name of a css color var() based on an object's name property
export const getColorVar = ({name}) => {

    switch (name) {

        case 'Solen':
            return '--sun'

        case 'Merkurius':
            return '--mercury'

        case 'Venus':
            return '--venus'

        case 'Jorden':
            return '--earth'

        case 'Mars':
            return '--mars'  

        case 'Jupiter':
            return '--jupiter'

        case 'Saturnus':
            return '--saturn'

        case 'Uranus':
            return '--uranus'

        case 'Neptunus':
            return '--neptune'

        default:
            console.log('Failed to set color var for ' + name)

    }
}


//Function that accepts any number and returns it as a string with thousands grouping
//For example passing the argument 4000000 will return "4 000 000"
export const stringifyBigNumber = (number) => {

    let returnString = ''

    const numberString = number.toString() //Does this to allow us to iterate through the digits of the number

    for (let i = 0; i < numberString.length; i++) {
        returnString += numberString[i]

        if ((numberString.length - i)%3 == 1 && numberString.length - i != 1) {
            returnString += ' '
        } 
    }

    return returnString

}