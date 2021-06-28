const fs = require('fs')
const filePath = './character_set.txt'

// Save the contents of the text file as a string
let characterSet = fs.readFileSync(filePath, 'utf8')


class LettersToNumbers {
	constructor (characterSet) {
		this.characterSet = characterSet;
		this.dictionary = {};
	}

	buildDict(offset){
		// Doctor the string to make it easier to manipulate
		characterSet = characterSet.replace(/\n/g, '')
		characterSet = characterSet.substring(16)


		let counter = offset

		for (let i = 0; i< characterSet.length; i++) {
			if (characterSet[i]===',' && characterSet[i+1] != ',') {
				counter += 1
				counter = counter % 100
				let x = counter
				x.toString()
				if (counter<10){
					// console.log(counter)
					x = '0' + x
				} 
				this.dictionary[characterSet[i-1]] = x
			}
		}
	}

	encrypt(sentence, offset){
		let result = ''
		this.buildDict(offset)
		sentence = sentence.split('')
		for (let i = 0; i<sentence.length; i++){
			result += this.dictionary[sentence[i]]
		}
		return result
	}
}

const lettersToNumbers = new LettersToNumbers(characterSet)

console.log(lettersToNumbers.encrypt('Hi, Ed!', 302))

