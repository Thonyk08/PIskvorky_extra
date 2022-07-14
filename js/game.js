const tiles = document.querySelectorAll(".tile")
const reset = document.querySelector(".reset");

let playerTurn = "X";
let computerTurn = "O";
let move = 1;
let board = ["", "", "", "", "", "", "", "", ""];
let danger = false;


const winclasses = ["animate__animated", "animate__tada", "win"];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//game logic - my turn, computer turn, update board, win, new game

tiles.forEach((tile, index) => {
   if(move<10){
        tile.addEventListener("click", () =>{
        
        
            myTurn(tile, index);
            computerMove();
            newGame();
            
        });
        
    }});

//my turn - my choice .. update board and check win

function myTurn(tile, index){

    if(move<10 && tile.innerText ==""){
            
        tile.innerText = playerTurn;
        move ++;
        updateBoard(index);
        resultValidation();
    
    }
}

// logic of computer turn - 1. atack move, 2. defensive move and 3. random move

function computerMove(){
    
    if(move%2 == 0){
    winMove();
    nextMove();
    randomMove();
    };
    
};

// return game to default settings

function newGame(){

    reset.addEventListener("click", () =>{
        tiles.forEach((tile) => {
            tile.innerText= "";
            removeWinClass(tile, winclasses);
                       
        })
              
        move = 1;
        board = ["", "", "", "", "", "", "", "", ""];
        danger = false;
});
};

// update board

function updateBoard(index){
    board[index] = tiles[index].innerText;
};

// ADD and REMOVE win class and animation class

function addWinClass(tile, winclasses){

    for (let i = 0; i<winclasses.length; i++){
        tile.classList.add(winclasses[i]);
    }
};


function removeWinClass(tile, winclasses){

    for (let i = 0; i<winclasses.length; i++){
        tile.classList.remove(winclasses[i]);
    }
};

//check if win is true, add win class and animation

function resultValidation(){

    for (let i = 0; i < winningCombinations.length; i++ ) {
       
        const wincombination = winningCombinations[i];
        const a = board[wincombination[0]];
        const b = board[wincombination[1]];
        const c = board[wincombination[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        
        if (a === b && b === c) {
           move = 11;
           
           wincombination.forEach(tile => {
                       
           addWinClass(tiles[tile], winclasses);
            
           })
          
        }
    }
}

//function of computer turn in attack or defense move

function turnO (a, b, c, x, y, z){

    if(a==""){
                
        tiles[x].innerText = computerTurn;
        move++;
        updateBoard(x);
        
    }
    else if(b ==""){
        
        tiles[y].innerText = computerTurn;
        move++;
        updateBoard(y);
        
    }
    else{
        
        tiles[z].innerText=computerTurn;
        move++;
        updateBoard(z);
        
    }
    
    resultValidation();
    
}


// defense move of computer

function nextMove(){
    for (let i = 0; i < winningCombinations.length; i++ ) {
       
        const wincombination = winningCombinations[i];
        let a = board[wincombination[0]];
        let b = board[wincombination[1]];
        let c = board[wincombination[2]];

        let x = [wincombination[0]];
        let y = [wincombination[1]];
        let z = [wincombination[2]];

        if (a === '' && b === '' && c === '') {
            continue;
        }

        if (move<10 && ((a === b && c === "") || (b === c && a === "") || (c === a && b === "")))  {
            danger = true;
            
            turnO(a, b, c, x, y, z);             
            break;
        }
        else{
            danger = false;
        }
    }

};

//attack move of computer

function winMove(){
    for (let i = 0; i < winningCombinations.length; i++ ) {
       
        const wincombination = winningCombinations[i];
        let a = board[wincombination[0]];
        let b = board[wincombination[1]];
        let c = board[wincombination[2]];

        let x = [wincombination[0]];
        let y = [wincombination[1]];
        let z = [wincombination[2]];

        if (a === '' && b === '' && c === '') {
            continue;
        }

        if (move<10 && ((a === b && b=== "O" && c === "") || (b === c && c === "O" && a === "") || (c === a && a === "O" && b === "")))  {
                                               
            turnO(a, b, c, x, y, z);             
            break;
        }
        else{
            continue;
        }
    }
};

//random move of computer

function randomMove(){

    let randomNumber = Math.floor(Math.random() * 8);
    let randomtile = tiles[randomNumber];
    let randomCorners = Math.floor(Math.random() * 4);
    const corners = [0, 2, 6, 8];
    let randomCorner = tiles[corners[randomCorners]];
        
    
    if(move<10 && randomtile.innerText !== "" && danger == false){
        
        randomMove();
    }
    else if(move<10 && randomtile.innerText == "" && danger == false){
        
        if(move <=2 && board[4] == ""){
            tiles[4].innerText = computerTurn; 
            move++;
            updateBoard(4);
        }
        else if(move <=2 && board[4] == "X"){
            randomCorner.innerText = computerTurn;
            move++;
            updateBoard(corners[randomCorners]);
        }

        else{

        randomtile.innerText = computerTurn;
        move++;
        updateBoard(randomNumber);
        resultValidation();
        }
        
    }
};