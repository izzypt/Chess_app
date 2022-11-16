function boardMatrix(){
    let board = [[],[],[],[],[],[],[],[],]
    let squares = document.getElementById("boardContainer").children
    let row = 0;

    for (let i = 0; i < squares.length; i++){
        if ( i !== 0 && i % 8 === 0){
            row += 1;
        }
        board[row].push(squares[i])
    }
    return board
}

function findMatrixCoordinates(position){
    let coordinates = []
    boardMatrix().map((row, rowIndex) => {
        return row.forEach((square, squareIndex) => {
            if (square.id === position)
                coordinates.push(rowIndex, squareIndex)
        })
    })
    return coordinates
}

export function moveIsValid(movingPiece, dropPosition, enemyPiece) {
    let board = boardMatrix();
    /*********/
    /* ROOK */
    /*******/
    if (movingPiece.piece === 'rook'){
        let [initialY, initialX] = findMatrixCoordinates(movingPiece.initialPosition);
        let [finalY, finalX]  = findMatrixCoordinates(dropPosition);
        
        while (initialY != finalY){
            if(initialY > finalY){
                initialY--
                if (board[initialY][initialX].children.length > 0){ return false };   
            }
            if(initialY < finalY){
                initialY++
                if (board[initialY][initialX].children.length > 0){ return false };  
            }
        }

        while (initialX != finalX){
            if(initialX > finalX){
                initialX--
                if (board[initialY][initialX].children.length > 0){ return false }; 
            }
            if(initialX < finalX){
                initialX++
                if (board[initialX][finalX].children.length > 0){ return false };  
            }
        }

        return true
    }
    /*********/
    /* PAWN */
    /*******/
    if (movingPiece.piece === 'pawn')
    {
        if (movingPiece.color === 'black' && (dropPosition == parseInt(movingPiece.initialPosition) + 8 || dropPosition == parseInt(movingPiece.initialPosition) + 8*2) && !enemyPiece){
            return true
        }

        if (movingPiece.color === 'white' && (dropPosition == parseInt(movingPiece.initialPosition) - 8 || dropPosition == parseInt(movingPiece.initialPosition) - 8*2) && !enemyPiece){
            return true
        }

        if (enemyPiece && (movingPiece.color === 'white' && (dropPosition == parseInt(movingPiece.initialPosition) - 7 || dropPosition == parseInt(movingPiece.initialPosition) - 9))){
            return true
        }

        if (enemyPiece && (movingPiece.color === 'black' && (dropPosition == parseInt(movingPiece.initialPosition) + 7 || dropPosition == parseInt(movingPiece.initialPosition) + 9))){
            return true
        }
        return false
    }

}

