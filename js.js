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
        let cells = document.querySelectorAll(".board_container div");

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
            console.log("winner is" + symbol);
        }
        if (_isAllEqual(_arr[3], _arr[4], _arr[5])) {
            console.log("winner is" + symbol);
        }
        if (_isAllEqual(_arr[6], _arr[7], _arr[8])) {
            console.log("winner is" + symbol);
        }

        //check if winner present in the columns
        if (_isAllEqual(_arr[0], _arr[3], _arr[6])) {
            console.log("winner is" + symbol);
        }
        if (_isAllEqual(_arr[1], _arr[3], _arr[7])) {
            console.log("winner is" + symbol);
        }
        if (_isAllEqual(_arr[2], _arr[5], _arr[8])) {
            console.log("winner is" + symbol);
        }

        //check if winner in diagonal 
        //check if winner present in the rows
        if (_isAllEqual(_arr[0], _arr[4], _arr[8])) {
            console.log("winner is" + symbol);
        }
        if (_isAllEqual(_arr[2], _arr[4], _arr[6])) {
            console.log("winner is" + symbol);
        }

    }



    return {
        startGame
    }






}()


upi.startGame();