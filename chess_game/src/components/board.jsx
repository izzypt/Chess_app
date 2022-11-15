import React from 'react'
import pieces from './pieces'
import { dragStart, enteringSquare, leavingSquare, allowDrop, drop } from './dragAndDrop'

function Board() {

    const getPiece = (i) => {
        /* Return piece for the corresponding position on the board */
        return pieces.find((piece) => piece.position === i)
    }

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
                    
                { getPiece(i) ? 
                    <img 
                        draggable="true" 
                        onDragStart={dragStart}
                        key={i}
                        id={getPiece(i).id} 
                        src={getPiece(i).src} 
                        data-color={getPiece(i).color}
                        data-piece={getPiece(i).piece}
                        alt ={getPiece(i).alt} 
                    ></img> : 
                    null
                }
                </div>)
            }
            else
            /* White squares */
            {
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
                    { getPiece(i) ? 
                        <img 
                            id={getPiece(i).id} 
                            draggable="true" 
                            onDragStart={dragStart}
                            key={i}
                            src={getPiece(i).src} 
                            alt ={getPiece(i).alt}
                            data-color={getPiece(i).color}
                            data-piece={getPiece(i).piece}
                        ></img> : 
                        null
                    }
                </div>)
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