'use strict';

//Pseudo-Class Game | called in index.html
function Game() {
    //before starting
    const start_button = document.getElementById('start');
    const restart_button = document.getElementById('restart');
    //todo: may add onchange event for instantly displaying the name
    const name_field = document.getElementById('name');
    const outputPoints = document.getElementById('points');
    const outputTries = document.getElementById('tries');
    let name = '', pointsTotal = 0, tries = 0;
    let playerSymbol, npcSymbol;
    const computerPlayer = {
        0: {id: 0, type: 'Schere', img: '/images/scissors.png'}, 
        1: {id: 1, type: 'Stein', img: '/images/rock.png'}, 
        2: {id: 2, type: 'Papier', img: '/images/paper.png'}
    };
    let clickedElement;

    //while playing
    const npcImage = document.getElementById('npc_image');
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
        resetColor()
        countPoints(-pointsTotal)
        npcImage.innerHTML = '';
    }

    function setName() {
        name = name_field.value;
        document.getElementById('display_name').innerText = name ? name : 'Deine Auswahl';
    }

    //todo: implement button to change name

    //returns object with random number and symbol name
    function randomSymbol()
    {
        const number = Math.floor(Math.random() * 3);
        return computerPlayer[number];
    }

    //starts the game
    function start() {
        //todo: with more elements change to 
        document.getElementsByClassName('game')[0].hidden = false;
        document.getElementsByClassName('game')[1].hidden = false;
        start_button.hidden = true;
        restart_button.hidden = false;

        scissors_button.onclick = function(){
            resetColor()
            clickedElement = scissors_button;
            playerSymbol = {id: 0, type: 'Schere'}
            output(compare())
        }   
        rock_button.onclick = function(){
            resetColor()
            clickedElement = rock_button;
            playerSymbol = {id: 1, type: 'Stein'}
            output(compare())
        }
        paper_button.onclick = function(){
            resetColor()
            clickedElement = paper_button;
            playerSymbol = {id: 2, type: 'Papier'}
            output(compare())
        }
    }

    function compare() 
    {
        tries++;
        npcSymbol = randomSymbol();
        resetColor();
        if (playerSymbol.id === npcSymbol.id){
            clickedElement.classList.add('draw');
            return {points: 1, npcSymbol, outcome: 'draw'};
        };
        if (
            (playerSymbol.id === 1) && (npcSymbol.id === 0)
            || (playerSymbol.id === 0) && (npcSymbol.id === 2)
            || (playerSymbol.id === 2) && (npcSymbol.id === 1)
        )
        {
            clickedElement.classList.add('win');
            return {points: 3, npcSymbol, outcome: 'lose'};
        }
        else {
            clickedElement.classList.add('lose');
            return {points: 0, npcSymbol, outcome: 'win'};
        }
    }

    function output({points, npcSymbol, outcome}) {
        npcImage.innerHTML = '<img class="btn_logo ' + outcome + '" src="' + npcSymbol.img + '" />'
        countPoints(points);
    }

    function countPoints(points)
    {
        pointsTotal += points;
        outputPoints.innerText= pointsTotal;
        outputTries.innerText = tries;
    }

    function resetColor() {
        if(clickedElement) 
        {
            clickedElement.classList.remove('win');
            clickedElement.classList.remove('draw');
            clickedElement.classList.remove('lose');
        }
    }
}
