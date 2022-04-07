let upi = function GameBoard() {
    //private attributes
    let _arr = new Array(9);
    let _lastSymbolPlaced = "X";
    //making the fixed sized array
    _arr.fill(undefined);
    Object.seal(_arr);


    function startGame() {
        //method called to place a symbol
        function _makeSymbol(e) {

            let divClicked = parseInt(e.target.getAttribute("data")) - 1;

            if (_arr[divClicked] == undefined) {
                if (_lastSymbolPlaced == "X") {
                    e.target.textContent = "O";
                    _lastSymbolPlaced = "O";
                    _arr.splice(divClicked, 1, "O");
                    _checkWinner("O");
                }
                else {
                    e.target.textContent = "X";
                    _lastSymbolPlaced = "X";
                    _arr.splice(divClicked, 1, "X");
                    _checkWinner("X");
                }
            }

        }

        //place event listener on all the divs
        let cells = document.querySelectorAll(".board_container div[data]");

        cells.forEach(cell => {
            cell.addEventListener("click", _makeSymbol)
        })
    }

    function _checkWinner(symbol) {

        function _isAllEqual(arg1, arg2, arg3) {
            if ((arg1 == arg2) && (arg2 == arg3) && arg1 != undefined) {
                return true;
            }
            return false;
        }

       

        //check if winner present in the rows
        if (_isAllEqual(_arr[0], _arr[1], _arr[2])) {
            gi.declareWinner(symbol);
        }
        if (_isAllEqual(_arr[3], _arr[4], _arr[5])) {
            gi.declareWinner(symbol);
        }
        if (_isAllEqual(_arr[6], _arr[7], _arr[8])) {
            gi.declareWinner(symbol);
        }

        //check if winner present in the columns
        if (_isAllEqual(_arr[0], _arr[3], _arr[6])) {
            gi.declareWinner(symbol);
        }
        if (_isAllEqual(_arr[1], _arr[4], _arr[7])) {
            gi.declareWinner(symbol);
        }
        if (_isAllEqual(_arr[2], _arr[5], _arr[8])) {
            gi.declareWinner(symbol);
        }

        //check if winner in diagonal 
       
        if (_isAllEqual(_arr[0], _arr[4], _arr[8])) {
            gi.declareWinner(symbol);
        }
        if (_isAllEqual(_arr[2], _arr[4], _arr[6])) {
            gi.declareWinner(symbol);
        }

         //check if match is a draw:
         if(_arr.indexOf(undefined)== -1){
            gi.declareWinner("-")
        }


    }

    function resetBoard(){
        _arr.fill(undefined);

        let cells = document.querySelectorAll(".board_container div[data]");

        cells.forEach(cell => {
            cell.textContent=""
        })
    }



    return {
        startGame, resetBoard
    }

}()



let gi= function GameInstance(){

    let _playerOneName;
    let _playerTwoName;


    //add listener on the play button
    let playButton= document.querySelector(".play-button");
    playButton.addEventListener("click", (event)=>
    {
        let divplayer1_name= document.getElementById("player1_name");
        let divplayer2_name= document.getElementById("player2_name");

           let positioningdiv= document.querySelector(".positioningdiv");
        positioningdiv.style.display="none"

        //set the names on the main page;
        let playerOneDisplay= document.querySelector(".playerOneDisplay");

        let playerOneNameDisplay = playerOneDisplay.querySelector(".name")

        playerOneNameDisplay.textContent=divplayer1_name.value;
        _playerOneName=divplayer1_name.value;

        // name on the main page
        let playerTwoDisplay= document.querySelector(".playerTwoDisplay");

        let playerTwoNameDisplay = playerTwoDisplay.querySelector(".name")

        playerTwoNameDisplay.textContent=divplayer2_name.value;
        _playerTwoName=divplayer2_name.value;


        upi.startGame();


    })

    //method to show the winner
    function declareWinner(symbol){

        //fetch the winner div
        let winner_div= document.querySelector(".winner_div");

        winner_div.style.display="flex";

        let winner_name = winner_div.querySelector(".name");

        if(symbol=="O"){
            winner_name.textContent="The Winner is: "+_playerOneName
        }
        if(symbol=="X"){
            winner_name.textContent="The Winner is: "+_playerTwoName;
        }
        if(symbol=="-"){
            winner_name.textContent="Noone won: Both of you suck! ";
        }

        let play_button= winner_div.querySelector(".play-button");
        play_button.addEventListener("click", ()=>{
            winner_div.style.display="none";
            upi.startGame();
            upi.resetBoard();
        })

    }

    return{
        declareWinner
    }

}()





