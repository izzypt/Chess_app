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

let colorToPlay = "white";

export function dragStart(ev) {
  let playerColor = ev.target.getAttribute("data-color")
  if (colorToPlay === playerColor)
    ev.dataTransfer.setData("Text", JSON.stringify({id: ev.target.id, piece: ev.target.dataset.piece, color: ev.target.dataset.color, initialPosition: ev.target.parentNode.id, firstMove: ev.target.dataset.firstmove}));
  else
    ev.preventDefault()
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
    let opponentColor  = ev.target?.dataset?.color
    let movingPiece = JSON.parse(ev.dataTransfer.getData("Text"))
    let dropPosition = ev.target.nodeName === 'DIV' ? ev.target.id : ev.target.parentNode.id
    let targetedSquare = ev.target.nodeName

    //Reset from hover color to original square color
    ev.target.nodeName === 'IMG' ? ev.target.style.backgroundColor = ev.target.parentNode?.dataset?.squarecolor : ev.target.style.backgroundColor = ev.target.dataset.squarecolor  
    
    //White pieces can only take black pieces and vice-versa, also check if move is valid.
    if (
        ((movingPiece.color === 'white' && opponentColor === 'black' && targetedSquare === 'IMG') || 
        (movingPiece.color === 'black' && opponentColor === 'white' && targetedSquare === 'IMG')) && 
        moveIsValid(movingPiece, dropPosition, true)
      ){
        //Change the turn to next color
        colorToPlay === 'white' ? colorToPlay = 'black' : colorToPlay = 'white'
        //Place the moving piece in the square
        ev.target.parentNode.append(document.getElementById(movingPiece.id)); 
        //Remove previous piece from the square
        ev.target.remove()
      }
    //When droping on empty square:
    if (targetedSquare === 'DIV' && moveIsValid(movingPiece, dropPosition, false)) {
        document.getElementById(movingPiece.id).setAttribute('data-firstmove', false)
        ev.target.append(document.getElementById(movingPiece.id)); 
        colorToPlay === 'white' ? colorToPlay = 'black' : colorToPlay = 'white'
    }
  }

