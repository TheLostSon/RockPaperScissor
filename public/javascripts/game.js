'use strict';

//Pseudo-Class Game | called in index.html
function Game() {
    //before starting
    document.getElementById('start').onclick = function(){
        setName()
        start()
        this.hidden = true;
    }
//VARIABLES AND CONSTANTS    
    const name_field = document.getElementById('name');
    //game status
    const game_status = document.getElementById('game_status');
    const game_status_win = document.getElementById('game_status_win');
    const game_status_lose = document.getElementById('game_status_lose');
    const game_status_draw = document.getElementById('game_status_draw');
    let gameStatus = game_status;
    //init button to reset game
    const restart_button = document.getElementById('restart');
    //init button to show previous match
    const lastMatch_button = document.getElementById('last_match');

    //variables and constants while playing
    let name = '', playerSymbol = {id: 0, type: ''}, comSymbol = {id: 0, type: ''};
    const computerPlayer = {
        0: {id: 1, type: 'Schere', img: 'com_scissors'}, 
        1: {id: 2, type: 'Stein', img: 'com_rock'}, 
        2: {id: 3, type: 'Papier', img: 'com_paper'}
    };
    let clickedElement, computerElement;
    let outcome = {player: '', com: ''};
    let points = {player: 0, com: 0};
    let pointsTotalPlayer = 0, pointsTotalCom = 0, tries = 0;

    //computer 
    const comImage = document.getElementById('com_image');
    const comLoading = document.getElementById('com_loading');
    //playerchoice: scissors
    const scissors_button = document.getElementById('scissors');
    //playerchoice: rock
    const rock_button = document.getElementById('rock');
    //playerchoice: paper
    const paper_button = document.getElementById('paper');
    
    //elements to output score
    const outputPlayerPoints = document.getElementById('points_player');
    const outputComPoints = document.getElementById('points_com');
    const outputTries = document.getElementById('tries');

//FUNCTIONS
    //displays the chosen name
    function setName() {
        name = name_field.value;
        document.getElementById('display_name_game').innerText = name ? name : 'Deine Auswahl';
        document.getElementById('display_name_points').innerText = name ? name : 'Ihre Punktzahl';
    }

    //starts the game, initiates buttons
    function start() {
        document.getElementsByClassName('game')[0].hidden = false; //restart-text 
        document.getElementsByClassName('game')[1].hidden = false; //spacer
        document.getElementsByClassName('game')[2].hidden = false; //game
        document.getElementsByClassName('game')[3].hidden = false; //points
        restart_button.hidden = false;

        setClickEvents()

        lastMatch_button.onclick = function(){
            showLastMatch()
            lastMatch_button.hidden = true;
        }
    }

    //displays outcome of the recent round
    async function output(comSymbol) {
        removeClickEvents();
        await loading()
        comImage.classList.add(outcome.com)
        computerElement.hidden = false;
        tries++;
        countPoints(points.player, points.com);
        await animate();
    }

    //loading animation for better gameplay
    function loading() {
        return new Promise((resolve => {
            comLoading.hidden = false;
            comImage.style.transition = 'transform 1050ms'
            comImage.style.transform = 'rotate(720deg)'
            setTimeout(function() {
                comLoading.hidden = true;
                resolve();
            }, 1000)
        }))
    }

    //sets outcome and points based on symbolId comparison (using the rock-paper-scissors-rules)
    //returns the random com-player
    function compare() 
    {
        comSymbol = randomSymbol();
        computerElement = document.getElementById(comSymbol.img);
        resetStyle();
        if (playerSymbol.id === comSymbol.id){
            points = {player: 1, com: 1}
            outcome = {player: 'draw', com: 'draw'}
            gameStatus = game_status_draw;
            return comSymbol;
        }
        if (
            (playerSymbol.id === 2) && (comSymbol.id === 1)
            || (playerSymbol.id === 1) && (comSymbol.id === 3)
            || (playerSymbol.id === 3) && (comSymbol.id === 2)
        )
        {
            points = {player: 3, com: 0}
            outcome = {player: 'win', com: 'lose'}
            gameStatus = game_status_win;
            return comSymbol;
        }
        else {
            points = {player: 0, com: 3}
            outcome = {player: 'lose', com: 'win'}
            gameStatus = game_status_lose;
            return comSymbol;
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
        pointsTotalCom += pointsC;
        
        //output
        outputPlayerPoints.innerText= pointsTotalPlayer;
        outputComPoints.innerText= pointsTotalCom;
        outputTries.innerText = tries;
    }
    
    //resets all styles applied in one round of a game
    function resetStyle() {
        if(clickedElement) 
        {
            comImage.style.transition = 'transform 0ms'
            comImage.style.transform = 'none'
            clickedElement.classList.remove('win');
            clickedElement.classList.remove('draw');
            clickedElement.classList.remove('lose');
            if (outcome.com) comImage.classList.remove(outcome.com);
            computerElement.hidden = true;
        }
        lastMatch_button.hidden = true;
    }

    //animates the recent round of the game
    function animate() {
        clickedElement.classList.add(outcome.player);
        game_status.hidden = true;
        gameStatus.hidden = false;
        setTimeout(function() {
                resetStyle()
                setClickEvents()
                lastMatch_button.hidden = false;
        }, 2500)
    }

    //displays results of the last played round 
    function showLastMatch() {
        clickedElement.classList.add(outcome.player)
        computerElement.hidden = false;
        comImage.classList.add(outcome.com)
    }

    //enable gameplay
    function setClickEvents(){
        restart_button.addEventListener('click', restartButton) 
        restart_button.hidden = false;
        gameStatus.hidden = true;

        buttonDeclaration(scissors_button, scissorButton)
        buttonDeclaration(rock_button, rockButton)
        buttonDeclaration(paper_button, paperButton)

        // scissors_button.addEventListener('click', scissorButton) 
        // scissors_button.style.cursor = 'pointer';
        // scissors_button.classList.add('clickable')
        // scissors_button.parentElement.style.transform = 'scale(1)'

        // rock_button.addEventListener('click', rockButton) 
        // rock_button.style.cursor = 'pointer';
        // rock_button.classList.add('clickable')
        // rock_button.parentElement.style.transform = 'scale(1)'

        // paper_button.addEventListener('click', paperButton) 
        // paper_button.style.cursor = 'pointer';
        // paper_button.classList.add('clickable')
        // paper_button.parentElement.style.transform = 'scale(1)'
    }

    function buttonDeclaration(button, clickHandler) {
        button.addEventListener('click', clickHandler) 
        button.style.cursor = 'pointer';
        button.classList.add('clickable')
        button.parentElement.style.transform = 'scale(1)'
    }

    //disable gameplay
    function removeClickEvents()
    {
        restart_button.removeEventListener('click', restartButton)
        restart_button.hidden = true;
        game_status.hidden = false;

        scissors_button.removeEventListener('click', scissorButton);
        scissors_button.style.cursor = 'default';
        scissors_button.classList.remove('clickable')
        scissors_button.parentElement.style.transform = 'scale(0.777)'

        rock_button.removeEventListener('click', rockButton);
        rock_button.style.cursor = 'default';
        rock_button.classList.remove('clickable')
        rock_button.parentElement.style.transform = 'scale(0.777)'

        paper_button.removeEventListener('click', paperButton);
        paper_button.style.cursor = 'default';
        paper_button.classList.remove('clickable')
        paper_button.parentElement.style.transform = 'scale(0.777)'
    }

    //click function for scissors
    function scissorButton(){
        symbolButtonHandler(scissors_button, {id: 1, type: 'Schere'});
    }  

    //click function for rock
    function rockButton(){
        symbolButtonHandler(rock_button, {id: 2, type: 'Stein'});
    }

    //click function for paper
    function paperButton(){
        symbolButtonHandler(paper_button, {id: 3, type: 'Papier'});
    }

    function symbolButtonHandler (button, symbol){
        resetStyle();
        clickedElement = button.parentElement;
        playerSymbol = symbol;
        output(compare());
    }

    function restartButton(){
        tries = 0;
        setName()
        resetStyle()
        countPoints(-pointsTotalPlayer, -pointsTotalCom)
        lastMatch_button.hidden = true;
    }
}
