/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Goal: EXCEEDS EXPECTATIONS
 * README has some additional changes made to style and to project to enhance experience
 * app.js */
let game;

// Starts the game
document.getElementById('btn__reset').addEventListener('click', event => {
    game = new Game();
    game.startGame();
});


// On click of one of the buttons, calls the handleInteraction method and sends button
$('.key').on('click', function (event) {
    game.handleInteraction(event.target);
});


/**
    Loops through all the buttons keys until finding a match for the keypress on the keyboard
    When match is found, that button is saved onto target before being sent to handleInteraction
**/
document.addEventListener('keypress', function (event) {
    let target;
    for (let i = 0; i < $('.key').length; i += 1)
    {
        if ($('.key').eq(i).html() === event.key)
        {
            target = $('.key')[i];
        }
    }
    game.handleInteraction(target);
});