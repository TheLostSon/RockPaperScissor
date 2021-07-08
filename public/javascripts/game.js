'use strict';

//Pseudo-Class Game | called in index.html
function Game() {
    //before starting
    const start_button = document.getElementById('start');
    const restart_button = document.getElementById('restart');
    //todo: may add onchange event for instantly displaying the name
    const name_field = document.getElementById('name');
    const counter = document.getElementById('counter');
    let name = '', pointsTotal = 0, tries = 0;
    let playerInput, computerPlayer = {number: null, symbol: ''};

    //while playing
    const match = document.getElementById('match');
    //scissors = 0
    const scissors_button = document.getElementById('scissors');
    //rock = 1
    const rock_button = document.getElementById('rock');
    //paper = 2
    const paper_button = document.getElementById('paper');
    

    start_button.onclick = function(){
        setName()
        start()
    }

    restart_button.onclick = function(){
        tries = 0;
        setName()
        countPoints(-pointsTotal)
        match.innerHTML = '';
    }

    function setName() {
        name = name_field.value;
        document.getElementById('display_name').innerText = name;
    }

    //todo: implement button to change name

    //returns object with random number and symbol name
    function randomSymbol()
    {
        const number = Math.floor(Math.random() * 3);
        return {number: number, 
            symbol: (number === 0) ? 'Schere' 
            : (number === 1) ? 'Stein' 
            : /*(number === 2) ?*/'Papier'};
    }

    //starts the game
    function start() {
        document.getElementById('game').hidden = false;
        start_button.hidden = true;
        restart_button.hidden = false;

        scissors_button.onclick = function(){
            playerInput = {number: 0, symbol: 'Schere'}
            output(compare())
        }   
        rock_button.onclick = function(){
            playerInput = {number: 1, symbol: 'Stein'}
            output(compare())
        }
        paper_button.onclick = function(){
            playerInput = {number: 2, symbol: 'Papier'}
            output(compare())
        }
     
    }

    function compare() 
    {
        tries++;
        computerPlayer = randomSymbol();
        if (playerInput.number === computerPlayer.number){
            return {text: 'Unentschieden.', points: 1};
        };
        if (
            (playerInput.symbol === 'Stein') 
            && (computerPlayer.symbol === 'Schere')
            || (playerInput.symbol === 'Schere') 
            && (computerPlayer.symbol === 'Papier')
            || (playerInput.symbol === 'Papier') 
            && (computerPlayer.symbol === 'Stein')
        )
        {
            return {text: 'Du hast gewonnen.', points: 3};
        }
        else {
            return {text: 'Der Computer hat gewonnen.', points: 0};
        }
    }

    function output(comparison) {
        const choice = '(' + ((name) ? name : 'Deine Wahl') + ': <b>' + playerInput.symbol + '</b> - Computer: <b>' + computerPlayer.symbol + '</b>)'; 
        match.innerHTML = '<p>' + comparison.text + ' ' + choice + '</p>';
        countPoints(comparison.points);
    }

    function countPoints(points)
    {
        pointsTotal += points;
        counter.innerHTML = 
        tries ? 'Ihre Punktzahl: <b>' + pointsTotal + '</b> Punkte nach <b>' + tries + '</b> Versuchen'
        : 'Ihre Punktzahl: <b>' + pointsTotal + '</b> Punkte';
    }
}
