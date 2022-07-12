const tiles = document.querySelectorAll(".tile")
const reset = document.querySelector(".reset");

let playerTurn = "X";
let computerTurn = "O";
let move = 1;
let board = ["", "", "", "", "", "", "", "", ""];
let danger = false;

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



tiles.forEach((tile, index) => {
   if(move<10){
        tile.addEventListener("click", (e) =>{
        let currentTile = e.target;
        
            if(move<10 && currentTile.innerText ==""){
            
                currentTile.innerText = playerTurn;
                move ++;
                updateBoard(index);
                resultValidation();
            
            }
            
            computerMove();
            newGame();
            
        });
        
    }});



function computerMove(){
    
    if(move%2 == 0){
    winMove();
    nextMove();
    randomMove();
    };
    
};


function newGame(){

    reset.addEventListener("click", () =>{
        tiles.forEach((tile) => {
            tile.innerText= "";
            tile.classList.remove("animate__animated");
            tile.classList.remove("animate__tada");
            tile.classList.remove("win")
        })
              
        move = 1;
        board = ["", "", "", "", "", "", "", "", ""];
        danger = false;
});
};


function updateBoard(index){
    board[index] = tiles[index].innerText;
};

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
            tiles[tile].classList.add("animate__animated");
            tiles[tile].classList.add("animate__tada");
            tiles[tile].classList.add("win")
            
           })
          
        }
    }
}


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
            break;
        }
        else{
            danger = false;
        }
    }

};

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
            break;
        }
        else{
            continue;
        }
    }
};

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