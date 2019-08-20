/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;

document.getElementById('btn__reset').addEventListener('click', event => {
    game = new Game();
    game.startGame();
});

$('.key').on('click', function (event) {
    console.log(event);
    game.handleInteraction(event.target);
});

document.addEventListener('keypress', function (event) {
    let target;
    for (let i = 0; i < $('.key').length; i += 1) {
        if ($('.key').eq(i).html() === event.key) {
            target = $('.key')[i];
        }
    }
    game.handleInteraction(target);
});