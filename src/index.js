#!/usr/bin/env node
import { words } from '../lib/words.js'
import { getWords } from './getWords.js'
import { tryLetters } from './tryLetters.js'

let exclude = {}
let knownCharacters = {}
let correctLetters = {}
let count = 1

async function solveWordle(words, word) {
    let row = await tryLetters(word)
    Object.keys(row).forEach((key, index) => {
        const letter = row[key]._letter
        const state = row[key]._state
        if (state === "absent") {
            exclude[letter] = true
        }
        if (state === "correct") {
            return correctLetters[letter] = { position: parseInt(index) }
        }
        if (state === "present") {
            return knownCharacters[letter] = { position: null }
        }
        Object.keys(knownCharacters).forEach(key => {
            delete exclude[key]
        }
        )
        Object.keys(correctLetters).forEach(key => {
            delete exclude[key]
        }
        )
    })
    let results = await getWords(words, correctLetters, knownCharacters, exclude)
    if (results.length != 1) {
        count++
        let randomWord = results[Math.floor(Math.random() * results.length)]
        process.stdout.write(`\r${count}: ${randomWord}`)
        await solveWordle(results, randomWord)
    }
    process.stdout.write(`\rSolved in ${count} tries | Answer: ${results[0]}\n`)
    process.exit()
}
const arguements = process.argv.slice(2)
const word = arguements[0];
solveWordle(words, word);