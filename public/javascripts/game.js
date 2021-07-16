'use strict';

//Pseudo-Class Game | called in index.html
function Game() {
    //before starting
    const start_button = document.getElementById('start');
    const restart_button = document.getElementById('restart');
    const lastMatch_button = document.getElementById('last_match');
    const name_field = document.getElementById('name');
    //while playing
    const outputPlayerPoints = document.getElementById('points_player');
    const outputComPoints = document.getElementById('points_com');
    const outputTries = document.getElementById('tries');
    let name = '', playerSymbol = {id: 0, type: ''}, npcSymbol = {id: 0, type: ''};
    const computerPlayer = {
        0: {id: 1, type: 'Schere', img: '/images/scissors.png'}, 
        1: {id: 2, type: 'Stein', img: '/images/rock.png'}, 
        2: {id: 3, type: 'Papier', img: '/images/paper.png'}
    };
    let clickedElement;
    let outcome = {player: '', com: ''};
    let points = {player: 0, com: 0};
    let pointsTotalPlayer = 0, pointsTotalCom = 0, tries = 0;

    //npc
    const npcImage = document.getElementById('npc_image');
    //playerchoice: scissors
    const scissors_button = document.getElementById('scissors');
    //playerchoice: rock
    const rock_button = document.getElementById('rock');
    //playerchoice: paper
    const paper_button = document.getElementById('paper');
    

    start_button.onclick = function(){
        setName()
        start()
    }

    //displays the chosen name
    function setName() {
        name = name_field.value;
        document.getElementById('display_name_game').innerText = name ? name : 'Deine Auswahl';
        document.getElementById('display_name_points').innerText = name ? name : 'Ihre Punktzahl';
    }

    //starts the game, initiates buttons
    function start() {
        document.getElementsByClassName('game')[0].hidden = false;
        document.getElementsByClassName('game')[1].hidden = false;
        document.getElementsByClassName('game')[2].hidden = false;
        start_button.hidden = true;
        restart_button.hidden = false;

        scissors_button.onclick = function(){
            resetStyle()
            clickedElement = scissors_button.parentElement;
            playerSymbol = {id: 1, type: 'Schere'}
            output(compare())
        }   
        rock_button.onclick = function(){
            resetStyle()
            clickedElement = rock_button.parentElement;
            playerSymbol = {id: 2, type: 'Stein'}
            output(compare())
        }
        paper_button.onclick = function(){
            resetStyle()
            clickedElement = paper_button.parentElement;
            playerSymbol = {id: 3, type: 'Papier'}
            output(compare())
        }
        restart_button.onclick = function(){
            tries = 0;
            setName()
            resetStyle()
            countPoints(-pointsTotalPlayer, -pointsTotalCom)
            npcImage.innerHTML = '';
            lastMatch_button.hidden = true;
        }
        lastMatch_button.onclick = function(){
            showLastMatch()
        }
    }

    //displays outcome of the recent round
    function output(npcSymbol) {
        npcImage.innerHTML = '<div class="background ' + outcome.com + '"><img class="btn_logo no_cursor" src="' + npcSymbol.img + '" /></div>'
        npcImage.style.transform = 'scale(1)'
        countPoints(points.player, points.com);
        animate();
    }

    //sets outcome and points based on symbolId comparison (using the rock-paper-scissors-rules)
    //returns the random npc-player
    function compare() 
    {
        tries++;
        npcSymbol = randomSymbol();
        resetStyle();
        if (playerSymbol.id === npcSymbol.id){
            points = {player: 1, com: 1}
            outcome = {player: 'draw', com: 'draw'}
            return npcSymbol;
        };
        if (
            (playerSymbol.id === 2) && (npcSymbol.id === 1)
            || (playerSymbol.id === 1) && (npcSymbol.id === 3)
            || (playerSymbol.id === 3) && (npcSymbol.id === 2)
        )
        {
            points = {player: 3, com: 0}
            outcome = {player: 'win', com: 'lose'}
            return npcSymbol;
        }
        else {
            points = {player: 0, com: 3}
            outcome = {player: 'lose', com: 'win'}
            return npcSymbol;
        }
    }

    //returns object from (computerPlayer) with random number and symbol name
    function randomSymbol()
    {
        const number = Math.floor(Math.random() * 3);
        return computerPlayer[number];
    }

    //used for counting and resetting points
    function countPoints(pointsP, pointsC)
    {
        pointsTotalPlayer += pointsP;
        outputPlayerPoints.innerText= pointsTotalPlayer;
        pointsTotalCom += pointsC;
        outputComPoints.innerText= pointsTotalCom;
        outputTries.innerText = tries;
    }
    
    //resets all styles applied in one round of a game
    function resetStyle() {
        if(clickedElement) 
        {
            clickedElement.style.transform = 'none'
            clickedElement.classList.remove('win');
            clickedElement.classList.remove('draw');
            clickedElement.classList.remove('lose');
            npcImage.style.transform = 'scale(0)'
        }
        lastMatch_button.hidden = true;
    }

    //animates the recent round of the game
    function animate() {
        clickedElement.style.transform = 'scale(0.777)'
        clickedElement.classList.add(outcome.player);
        const resetCount = tries;
        setTimeout(function() {
            if(tries === resetCount) {
                resetStyle()
                lastMatch_button.hidden = false;
            }
        }, 2500)
    }

    //displays results of the last played round 
    function showLastMatch() {
        clickedElement.classList.add(outcome.player)
        npcImage.style.transform = 'scale(1)'
    }
}
