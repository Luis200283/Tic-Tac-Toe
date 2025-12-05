function getArrays(container) {
    let matrixOrder = 3;
    const rowArray = getBoardArray()
    const columnArray = getColumnArray(rowArray);
    const diagonalsArray = getDiagonalsArray(rowArray)

    function getBoardArray() {
        const array = []
        let index = 0
        for (let i = 0; i < matrixOrder; i++) {
            array.push([])
            for (let j = 0; j < matrixOrder; j++) {
                array[i].push(container[index].textContent)
                index++
            }
        }
        return array
    }

    function getColumnArray(array) {
        const newArray = [];
        for (let i = 0; i < matrixOrder; i++) {
            newArray.push([])
        }
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                newArray[j].push(array[i][j])
            }
        }
        return newArray
    }

    function getDiagonalsArray(array) {
        const newArray = [[], [],]
        for (let i = 0; i < array.length; i++) {
            newArray[0].push(array[i][i])
            newArray[1].push(array[i][array.length - 1 - i])
        }
        return newArray
    }

    searchMatch(rowArray, columnArray, diagonalsArray)
}

function searchMatch(rows, columns, diagonals) {

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
        }
    }

    columns.forEach((row) => rowMatch(row))
    rows.forEach((row) => rowMatch(row))
    diagonals.forEach((row) => rowMatch(row))

}

function screeView() {
    const gameBoard = document.getElementById('game-board')
    const gridsBoard = document.getElementsByClassName('grid-board')

    let turn = 1
    let market = [0]

    gameBoard.addEventListener('click', (event) => {
        if (event.target.title !== 'container') {
            const element = event.target
            const elementTitle = Number(element.title)
            let isMarket = true


            market.forEach((val) => {
                isMarket = val !== elementTitle ? false : true
            })

            if (!isMarket) {
                market.push(Number(elementTitle))
                if (turn) {
                    element.textContent = "X"
                    turn--
                }
                else {
                    element.textContent = "O"
                    turn++
                }
            }
            getArrays(gridsBoard)
        }
    })



}
screeView()

function clearScreen() {
    const gridsBoard = document.getElementsByClassName('grid-board')
    const button = document.querySelector('button')

    button.addEventListener('click', () => {
        for (let i = 0; i < gridsBoard.length; i++) {
            console.log(gridsBoard[i])
            gridsBoard[i].textContent = ''
        }
    })
}

