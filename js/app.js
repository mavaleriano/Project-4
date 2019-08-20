/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;

document.getElementById('btn__reset').addEventListener('click', event => {
    game = new Game();
    game.startGame();
});

$('.key').on('click','keypress', function (event) {
    game.handleInteraction(event.target);
});