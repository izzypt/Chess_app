export function moveIsValid(movingPiece, dropLocation, enemyPiece) {

    let squares = document.getElementById("boardContainer").children
    console.log(squares[movingPiece.initialPosition])
    if (movingPiece.piece === 'pawn')
    {
        if (movingPiece.color === 'black' && (dropLocation == parseInt(movingPiece.initialPosition) + 8 || dropLocation == parseInt(movingPiece.initialPosition) + 8*2) && !enemyPiece){
            return true
        }

        if (movingPiece.color === 'white' && (dropLocation == parseInt(movingPiece.initialPosition) - 8 || dropLocation == parseInt(movingPiece.initialPosition) - 8*2) && !enemyPiece){
            return true
        }

        if (enemyPiece && (movingPiece.color === 'white' && (dropLocation == parseInt(movingPiece.initialPosition) - 7 || dropLocation == parseInt(movingPiece.initialPosition) - 9))){
            return true
        }

        if (enemyPiece && (movingPiece.color === 'black' && (dropLocation == parseInt(movingPiece.initialPosition) + 7 || dropLocation == parseInt(movingPiece.initialPosition) + 9))){
            return true
        }

        return false
    }
}

