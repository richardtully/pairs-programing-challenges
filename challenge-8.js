const fs = require('fs')
const filePath = './character_set.txt'

// Save the contents of the text file as a string
let characterSet = fs.readFileSync(filePath, 'utf8')


class LettersToNumbers {
	constructor (characterSet) {
		this.characterSet = characterSet;
		this.dictionary = {};
	}

	buildDict(offset, encrypt){
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
				if (encrypt === true) {
					this.dictionary[characterSet[i-1]] = x} else {
						this.dictionary[x] = characterSet[i-1]
					}
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

	decrypt(code, offset) {
		let answer = '';
		this.buildDict(offset, false);
		code = code.split('');
		console.log(code);
		for (let i = 0; i < code.length/2; i++) {
			answer += this.dictionary[code[2*i] + code[2*i + 1]];
		}
		return answer
	}
}

const lettersToNumbers = new LettersToNumbers(characterSet)


console.log(lettersToNumbers.decrypt('0681497203762572077292808186837291878577878677459172878672928772928081917275818880779025', 4771))
console.log(lettersToNumbers.dictionary)
