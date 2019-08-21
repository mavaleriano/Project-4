/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/*** 
    URL for website used to get phrases:
    https://www.phrases.org.uk/meanings/phrases-and-sayings-list.html
***/
class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }


    /**
     * Captures the parent element of phrase about to be added
     * Creates regex to differentiate between letters and spaces
     * Loops through the phrase, whenever its a letter it creates a hidden letter class
     * Otherwise creates a space
     */
    addPhraseToDisplay() {
        const $phraseLetters = $('.section ul');
        const regex = /[a-z]/i;
        for (let i = 0; i < this.phrase.length; i += 1) {
            let letter = this.phrase.charAt(i);
            if (regex.test(letter)) {
                let tempElement = $(`<li class="hide letter ${letter}">${letter}</li>`);
                $phraseLetters.append(tempElement);
            }
            else {
                let tempElement = $(`<li class="space"> </li>`);
                $phraseLetters.append(tempElement);
            }
        }
    }


    /**
     * Loops through phrase comparing each letter to letter received. If, at any point, the letters match it returns true. otherwise, it
     * exits the loops and returns false
     */
    checkLetter(letter) {
        for (let i = 0; i < this.phrase.length; i += 1) {
            let phraseLetter = this.phrase.charAt(i);
            if (phraseLetter === letter) {
                return true;
            }
        }
        return false;
    }


    /**
     * Captures the associated letter, removes the hide class and adds the show class: displays letter on game
     */
    showMatchedLetter(letter) {
        $(`li.hide.letter.${letter}`).removeClass('hide').addClass('show');
    }
}