/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const $startGame = $('#overlay');
var livesLeft = 5;


class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    createPhrases() {
        const arrOfPhrases = [];
        const possiblePhrases =  ['a bird in the hand is worth two in the bush',
                                  'a bunch of fives',
                                  'a chain is only as strong as its weakest link',
                                  'a change is as good as a rest',
                                  'a countenance more in sorrow than in anger'];
        possiblePhrases.forEach(phrase => arrOfPhrases.push(new Phrase(`${phrase}`)));
        return arrOfPhrases;
    }

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * 4)]; 
    }

    startGame() {
        $startGame.hide();
        const thePhrase = this.getRandomPhrase();
        thePhrase.addPhraseToDisplay();
        this.activePhrase = thePhrase;
    }

    checkForWin() {
        let allLetters = $('li.hide.letter');
        if (allLetters.length === 0) {
            return true;
        }
        return false;
    }

    removeLife() {
        let $hearts = $('.tries');
        $hearts[0].remove();
        livesLeft -= 1;
        $('#scoreboard ol').append($('<li class="tries" id ="lost-lives"><img src="images/lostHeart.png" alt="Lost Heart Icon" height="35" width="30"></li>'));

        if (livesLeft === 0) {
            this.gameOver(this.checkForWin());
        }

    }

    gameOver(gameWon) {

        $startGame.show();
        if (gameWon) {
            $('#game-over-message').html('<strong>GREAT</strong> job!');
            $startGame.removeClass('start').removeClass('lose').addClass('win');
        }
        else {
            $('#game-over-message').html('Sorry, better luck next time!');
            $startGame.removeClass('start').removeClass('win').addClass('lose');
        }
        $('.letter').remove(); //Removes the letters and spaces (following line) from previous game
        $('.space').remove();
        $('.key').prop('disabled', false).removeClass('wrong').removeClass('chosen');
        livesLeft = 5;
        $('#scoreboard ol').remove();
        $('#scoreboard').append($('<ol></ol>'));
        for (let i = 0; i < 5; i += 1) {
            $('#scoreboard ol').append($('<li class="tries" id ="lost-lives"><img src="images/liveHeart.png" alt="Lost Heart Icon" height="35" width="30"></li>'));
        }
    }

    /***
        URL used to reference how to get innertext
        https://stackoverflow.com/questions/37887219/how-to-get-the-text-html-value-from-event-target-using-jquery
    ***/
    handleInteraction(button) {
        let letter = button.innerText;
        button.disabled = true;
        //button.style.color = 'red';
        if (this.activePhrase.checkLetter(letter)) {
            $(button).addClass('chosen');
            this.activePhrase.showMatchedLetter(letter);
            console.log('Good job!');
            if (this.checkForWin()) {
                setTimeout(() => this.gameOver(true), 2000);
                
            }
        }
        else {
            $(button).addClass('wrong');
            this.removeLife();
        }
        //console.log(letter);
    }
}
