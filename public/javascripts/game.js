'use strict';

//Pseudo-Class Game | called in index.html
function Game() {
    //before starting
    const start_button = document.getElementById('start');
    const name_field = document.getElementById('name');
    const counter = document.getElementById('counter');
    let name = '', pointsTotal = 0;

    //while playing
    //scissors = 0
    const scissors_button = document.getElementById('scissors');
    //rock = 1
    const rock_button = document.getElementById('rock');
    //paper = 2
    const paper_button = document.getElementById('paper');
    

    start_button.onclick = function(){
        name = name_field.value;
        if(name.length === 0)
        {
            alert('Sie müssen einen Namen eingeben, bevor Sie das Spiel starten können.')
        }
        else{
            start();
        }
    }

    //todo: implement button to change name

    //returns object with random number and symbol name
    function randomSymbol()
    {
        const number = Math.floor(Math.random() * 3);
        return {number: number, symbol: (number === 0) ? 'Schere' : (number === 1) ? 'Stein' : 'Papier'};
    }

    //starts the game
    function start() {
        console.log('Game starts');

        scissors_button.onclick = function(){
            output(compare({number: 0, symbol: 'Schere'}))
        }   
        rock_button.onclick = function(){
            output(compare({number: 1, symbol: 'Stein'}))
        }
        paper_button.onclick = function(){
            output(compare({number: 1, symbol: 'Papier'}))
        }
     
    }

    function compare(playerInput) 
    {
        const computerPlayer = randomSymbol();
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

    function output(winnerObject) {
        document.getElementById('output').innerHTML = '<p>' + winnerObject.text + '</p>';
        countPoints(winnerObject.points);
    }

    function countPoints(points)
    {
        pointsTotal += points;
        counter.innerHTML = 'Ihre Punktzahl: <b>' + pointsTotal + '</b>';
    }
}
