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

function check_X_Y_Axis(board, initialX, finalX, initialY, finalY, enemyPiece){
    // Y axis
    while (initialY !== finalY){
        if(initialY > finalY ){
            initialY--
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false };   
        }
        if(initialY < finalY){
            initialY++
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false };  
        }
    }
    // X axis
    while (initialX !== finalX){
        if(initialX > finalX){
            initialX--
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false }; 
        }
        if(initialX < finalX){
            initialX++
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false }; 
        }
    }

    return true
}

function checkDiagonal(board, initialX, finalX, initialY, finalY, enemyPiece){
    while(initialX != finalX && initialY != finalY)
    {

        if(initialX > finalX && initialY > finalY)
        {
            initialX--
            initialY--
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false }; 
        }

        if(initialX < finalX && initialY < finalY)
        {
            initialX++
            initialY++
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false }; 
        }

        if(initialX > finalX && initialY < finalY)
        {
            initialX--
            initialY++
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false }; 
        }

        if(initialX < finalX && initialY > finalY)
        {
            initialX++
            initialY--
            if (board[initialY][initialX].children.length > 0 && !enemyPiece){ return false }; 
        }
    }

    return true
}

export function moveIsValid(movingPiece, dropPosition, enemyPiece) {
    //get board matrix.
    let board = boardMatrix();
    //get coordinates of the piece position on the matrix.
    let [initialY, initialX] = findMatrixCoordinates(movingPiece.initialPosition);
    let [finalY, finalX]  = findMatrixCoordinates(dropPosition);
    //Calculate variation on the X and Y axis.
    const variacaoX = Math.abs(finalX - initialX)
    const variacaoY = Math.abs(finalY - initialY)

    /***********/
    /* BISHOP */
    /*********/
    if (movingPiece.piece === 'bishop')
    {
        // Bishops always need to move same amount of houses on the X and Y axis, so the variation in both axis as to be the same.
        if(variacaoX !== variacaoY) {return false};

        return checkDiagonal(board, initialX, finalX, initialY, finalY, enemyPiece)
    }
    /***********/
    /* KNIGHT */
    /*********/
    if (movingPiece.piece === 'knight'){
        //Knights can only move 2 squares in the Y axis and 1 in the X axis
        //OR 2 squares in the X axis and 1 in the Y axis.
        //Also, they can jump through pieces.
        if((variacaoX === 2 && variacaoY === 1) || (variacaoX === 1 && variacaoY === 2)){
            return true
        }
        return false;
    }
    /**********/
    /* QUEEN */
    /********/
    if (movingPiece.piece === 'queen'){

        if((variacaoX === 1 && variacaoY === 0) || (variacaoX === 0 && variacaoY === 1)  || (variacaoX === 1 && variacaoY === 1)|| variacaoX === variacaoY || !(initialX !== finalX && initialY !== finalY)){
            return true;
        }
        else
            console.log("invalid move")
    }
    /*********/
    /* KING */
    /*******/
    if (movingPiece.piece === 'king'){

        if ((variacaoX === 1 && variacaoY === 0) || (variacaoX === 0 && variacaoY === 1)  || (variacaoX === 1 && variacaoY === 1))
            return true
        else 
            return false
    }
    /*********/
    /* ROOK */
    /*******/
    if (movingPiece.piece === 'rook'){        
        // Rook can only move on the X axis or Y axis. Not both
        if(initialX !== finalX && initialY !== finalY) {return false};

        return check_X_Y_Axis(board, initialX, finalX, initialY, finalY, enemyPiece)
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

