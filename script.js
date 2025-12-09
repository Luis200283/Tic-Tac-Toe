const gameBoard = function (gridsBoard) {
    const array = []
    const matrixOrder = 3
    return {
        rows() {
            if (array.length === 0) {
                let index = 0
                for (let i = 0; i < matrixOrder; i++) {
                    array.push([])
                    for (let j = 0; j < matrixOrder; j++) {
                        array[i].push(gridsBoard[index].textContent)
                        index++
                    }
                }
                return array
            }
            return array
        },
        columns() {
            if (array.length === 0) this.rows()
            const newArray = [];
            for (let i = 0; i < matrixOrder; i++) {
                newArray.push([])
                for (let j = 0; j < matrixOrder; j++) {
                    newArray[i].push(array[j][i])
                }
            }
            return newArray
        },
        diagonals() {
            if (array.length === 0) this.rows()
            const newArray = [[], [],]
            for (let i = 0; i < array.length; i++) {
                newArray[0].push(array[i][i])
                newArray[1].push(array[i][array.length - 1 - i])
            }
            return newArray
        }
    }

}


function searchMatch(gridsBoard) {
    let playerWin = false

    function rowMatch(array) {
        let allEqual = true
        array.forEach((element, index) => {
            const firstElement = array[0]
            if (index > 0 && element !== firstElement) {
                allEqual = false
            }
            if (element === '') {
                allEqual = false
            }
        })
        if (allEqual) {
            alert(`${array[0]} ha ganado`)
            clearScreen()
            playerWin = true
        }
    }

    function searchTie(array) {
        let counter = 0
        array.forEach((element) => {
            element.forEach((val) => {
                if (val !== '') ++counter
            })
        })
        if (counter === 9 && !playerWin) {
            alert('They are tied the game')
            clearScreen()
        }
    }

    function clearScreen() {
        const gridsBoard = document.getElementsByClassName('grid-board')
        const button = document.querySelector('button')

        function clear() {
            for (let i = 0; i < gridsBoard.length; i++) {
                console.log(gridsBoard[i])
                gridsBoard[i].textContent = ''
            }
        }

        setTimeout(clear, 500)
        button.addEventListener('click', clear)
    }

    gameBoard(gridsBoard).rows().forEach((row) => { rowMatch(row) })
    gameBoard(gridsBoard).columns().forEach((row) => { rowMatch(row) })
    gameBoard(gridsBoard).diagonals().forEach((row) => { rowMatch(row) })
    searchTie(gameBoard(gridsBoard).rows())
}



function screeView() {
    const gameBoard = document.getElementById('game-board')
    let gridsBoard = document.getElementsByClassName('grid-board')
    let turnCounter = 1
    let market = [0]

    gameBoard.addEventListener('click', (event) => {
        if (event.target.title !== 'container') {
            const element = event.target
            const gridNumber = Number(element.title)
            let gridIsMarket = true

            market.forEach((val) => {
                gridIsMarket = val !== gridNumber ? false : true
            })

            if (!gridIsMarket) {
                market.push(Number(gridNumber))
                if (turnCounter) {
                    element.textContent = "X"
                    turnCounter--
                }
                else {
                    element.textContent = "O"
                    turnCounter++
                }
            }
            searchMatch(gridsBoard)
        }
    })



}
screeView()