import React from 'react'
import { enteringSquare, leavingSquare, allowDrop, drop } from './dragAndDrop'
import Piece from './pieces'

function Board(props) {

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
                        onDrop={ev => drop(ev, props.setColorToMove, props.colorToMove)} 
                        onDragOver={allowDrop} 
                        onDragEnter={enteringSquare} 
                        onDragLeave={leavingSquare}
                    >
                        {<Piece i={i} colorToMove={props.colorToMove} />}
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
                        onDrop={ev => drop(ev, props.setColorToMove, props.colorToMove)} 
                        onDragOver={allowDrop} 
                        onDragEnter={enteringSquare} 
                        onDragLeave={leavingSquare}
                        style={{width:60, height:60, backgroundColor:'#eeeed5'}} 
                    >
                        { <Piece i={i} colorToMove={props.colorToMove} />}
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