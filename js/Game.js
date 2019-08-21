/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

const $startGame = $('#overlay');


class Game
{
    /**
     * this.missed: number of missed letters, errors
     * this.phrases: the list of five phrases
     * this.activePhrase: the current phrase
     **/
    constructor()
    {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }


    //Returns new array of phrase objects
    createPhrases()
    { 
        const arrOfPhrases = [];
        const possiblePhrases =  ['a bird in the hand is worth two in the bush',
                                  'a bunch of fives',
                                  'a chain is only as strong as its weakest link',
                                  'a change is as good as a rest',
                                  'a countenance more in sorrow than in anger'];
        possiblePhrases.forEach(phrase => arrOfPhrases.push(new Phrase(`${phrase}`)));
        return arrOfPhrases;
    }


    //Returns a random phrase object
    getRandomPhrase()
    {
        return this.phrases[Math.floor(Math.random() * 4)]; 
    }


    /**
     * Initializes the game by: 
     * Hiding the overlaying div
     * Getting the phrase and setting it on the display
     * Setting the active phrase
     **/
    startGame() {
        $startGame.hide();
        const thePhrase = this.getRandomPhrase();
        thePhrase.addPhraseToDisplay();
        this.activePhrase = thePhrase;
    }


    /**
     * Checks to see if there's any letters that are still hidden
     * if there are still hidden, returns false
     * if no hidden letters left, returns true
     **/
    checkForWin()
    {
        let allLetters = $('li.hide.letter');
        if (allLetters.length === 0)
        {
            return true;
        }
        return false;
    }


    /** 
     * Removes the liveHeart and replaces them with lostHearts
     * Increments the missed value until reaching 5,
     * At which point the game is over
     * Adds a paragraph to the display which gives viewer chance to view score if they lost
     * Delays this using setTimeout for 5 sec
     **/
    removeLife()
    {
        let $hearts = $('.tries');
        $hearts[0].remove();
        this.missed += 1;
        $('#scoreboard ol').append($('<li class="tries" id ="lost-lives"><img src="images/lostHeart.png" alt="Lost Heart Icon" height="35" width="30"></li>'));

        if (this.missed === 5)
        {
            $('#phrase').after($(`<p class="answer"><strong>CORRECT ANSWER:</strong> "${this.activePhrase.phrase}"</p>`));
            setTimeout(() => {
                this.gameOver(this.checkForWin())
            }, 5000);
            
        }

    }


    /**
     * Receives true or false for gameOver
     * Resets all values for the next game
     **/
    gameOver(gameWon)
    {
        $('p').remove();                                                         // Removes the paragraph with the answer from previous game
        $startGame.show();                                                       // Displays the initial Start screen
        if (gameWon)
        {
            $('#game-over-message').html('<strong>GREAT</strong> job!');         // If won, give appropriate message with win clas
            $startGame.removeClass('start').removeClass('lose').addClass('win'); 
        }
        else
        {
            $('#game-over-message').html('Sorry, better luck next time!');       // If lost, gives appropriate message with lose class
            $startGame.removeClass('start').removeClass('win').addClass('lose');
        }
        $('.letter').remove();                                                  // Removes the letters and spaces (following line) from previous game
        $('.space').remove();                                                  
        $('.key').prop('disabled', false).removeClass('wrong').removeClass('chosen'); // Enables all buttons and removes added classes
        this.missed = 0;                                                        // Resets missed
        $('#scoreboard ol').remove();                                           // Removes old phrase
        $('#scoreboard').append($('<ol></ol>'));
        for (let i = 0; i < 5; i += 1)                                          // Adds hearts back correctly
        {                
            $('#scoreboard ol').append($('<li class="tries" id ="lost-lives"><img src="images/liveHeart.png" alt="Lost Heart Icon" height="35" width="30"></li>'));
        }
    }


    /***
     * URL used to reference how to get innertext
     * https://stackoverflow.com/questions/37887219/how-to-get-the-text-html-value-from-event-target-using-jquery
     * URL used to use setTimeout:
     * https://javascript.info/settimeout-setinterval
     * Controls game flow
     * [1] The 'if' to check if wrong class is already in the letter was added because of typing into keyboard,
     * where it would continue to removeLife if you typed the same letter
    ***/
    handleInteraction(button)
    {
        let letter = button.innerText;
        button.disabled = true;                                 // Disabled button to avoid further clicks

        if (this.activePhrase.checkLetter(letter))              // If letter is in the phrase
        {
            $(button).addClass('chosen');                       // Add chosen class and show the letter
            this.activePhrase.showMatchedLetter(letter);
            if (this.checkForWin())
            {
                setTimeout(() => this.gameOver(true), 2000);    // If won, delay and call gameOver
            }
        }
        else
        {
            if (!$(button).hasClass('wrong'))                   // Otherwise, if it hasnt been wrong yet
            {                                                   // Add wrong class[1] and remove a life
                $(button).addClass('wrong');
                this.removeLife();
            }
        }
    }
}
