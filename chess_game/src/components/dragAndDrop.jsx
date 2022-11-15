import { moveIsValid } from './validMoves'

/* 
  Drag And Drop Events:

  Source        Target
  _______       ________
  onDrag        onDragOver
  onDragStart   onDragEnter
  onDragEnd     onDragLeave
                onDrop

  DataTransfer object 
    Is used to hold the data that is being dragged during a drag and drop operation.

  DataTransfer.getData()
    Retrieves the data for a given type, or an empty string if data for that type does not exist 
    or the data transfer contains no data

  DataTransfer.setData()
    Set the data for a given type. 
    If data for the type does not exist, it is added at the end, such that the last item in the types list will be the new format. 
    If data for the type already exists, the existing data is replaced in the same position.

*/


export function dragStart(ev) {
    ev.dataTransfer.setData("Text", JSON.stringify({id: ev.target.id, piece: ev.target.dataset.piece, color: ev.target.dataset.color, initialPosition: ev.target.parentNode.id}));
  }

export function enteringSquare(ev){
    ev.target.style.backgroundColor = '#ffc185';
  }

export function leavingSquare(ev){
    ev.target.style.backgroundColor = ev.target.getAttribute('data-squarecolor');
  }

export function allowDrop(ev) {
    ev.preventDefault();
  }

export function drop(ev) {
    ev.preventDefault();
    let  opponentColor  = ev.target?.dataset?.color
    let movingPiece = JSON.parse(ev.dataTransfer.getData("Text"))
    let dropLocation = ev.target.nodeName === 'DIV' ? ev.target.id : ev.target.parentNode.id

    console.log("dropLocation: ", dropLocation)
    
    //Make sure white pieces can only take black pieces and vice-versa.
    if ((movingPiece.color === 'white' && opponentColor === 'black' && ev.target.nodeName === 'IMG') ||
        (movingPiece.color === 'black' && opponentColor === 'white' && ev.target.nodeName === 'IMG')) 
    {
      if(moveIsValid(movingPiece, dropLocation, true)){
        ev.target.parentNode.append(document.getElementById(movingPiece.id)); 
        ev.target.remove()
      }
    }
    if (ev.target.nodeName === 'DIV') {
      if(moveIsValid(movingPiece, dropLocation, false)){
        //if we are dropping on a free square just append the piece
        ev.target.append(document.getElementById(movingPiece.id)); 
      }
    }
    //if we are dropping on an occupied squared reset the drag color according to the parent node default color
    if (ev.target.nodeName === 'IMG') 
      ev.target.style.backgroundColor = ev.target.parentNode?.dataset?.squarecolor
    else     
      ev.target.style.backgroundColor = ev.target.dataset.squarecolor
  }




