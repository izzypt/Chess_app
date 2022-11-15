import React from 'react'
import { enteringSquare, leavingSquare, allowDrop, drop } from './dragAndDrop'
import Piece from './pieces'

function Board() {

    const generateBoard = () => {
        let i = 0;
        let row = 0;
        let squares = [];
    
        while (i < 64) {
            /* Generate 64 square board */
            if( (i + row ) % 2 === 0)
            {
                /* Green squares */
                squares.push(
                    <div 
                        key={i}
                        id={i}
                        data-squarecolor="#7d945d" 
                        style={{width:60, height:60, backgroundColor:'#7d945d'}} 
                        onDrop={drop} 
                        onDragOver={allowDrop} 
                        onDragEnter={enteringSquare} 
                        onDragLeave={leavingSquare}
                    >
                        { <Piece i={i} />}
                    </div>
                )
            }
            else
            {
                /* White squares */
                squares.push(
                    <div 
                        key={i}
                        id={i}
                        data-squarecolor="#eeeed5" 
                        onDrop={drop} 
                        onDragOver={allowDrop} 
                        onDragEnter={enteringSquare} 
                        onDragLeave={leavingSquare}
                        style={{width:60, height:60, backgroundColor:'#eeeed5'}} 
                    >
                        { <Piece i={i} />}
                    </div>
                )
            }
            i++
            if (i % 8 === 0) row += 1
        }
        return squares
    }
    
  return (
    <React.Fragment>
        {generateBoard()}
    </React.Fragment>
  )
}

export default Board