
export async function getWords(words, correct, known, excludes) {
    let possibleWords = [];
    let mustContain = Object.keys(correct).map(key => key)
    Object.keys(known).map(key => {
        if (!mustContain.includes(key)) {
            mustContain.push(key)
        }
    })

    possibleWords = words.filter(word => {
        const wordLetters = word.split('')
        const contains = wordLetters.filter(letter => mustContain.includes(letter))
        if (contains.length >= mustContain.length) {
            return word
        }
    })

    possibleWords = possibleWords.filter(word => {
        for (let key in correct) {
            if (correct[key].position !== word.indexOf(key)) {
                return false
            }
        }
        return true
    })


    possibleWords = possibleWords.filter(word => {
        const wordLetters = word.split('')
        const contains = wordLetters.filter(letter => Object.keys(excludes).includes(letter))
        if (contains.length === 0) {
            return word
        }
    })
    return possibleWords
}

