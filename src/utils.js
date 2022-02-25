
export const colors = ['red', 'blue', 'green', 'yellow'];
export const diceValues = [...colors, 'all', 'back'];

export const tokenPermutations = [
    ['red', 'blue'],
    ['red', 'green'],
    ['red', 'yellow'],
    ['blue', 'green'],
    ['blue', 'yellow'],
    ['green', 'yellow']
]

export const randomColor = ()  => {
    return diceValues[Math.floor(Math.random() * diceValues.length)];
}


export const randomPermutation = ()  => {
    return tokenPermutations[Math.floor(Math.random() * tokenPermutations.length)];
}
