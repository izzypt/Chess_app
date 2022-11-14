export function dragStart(ev) {
    ev.dataTransfer.setData("Text", JSON.stringify({id: ev.target.id, color: ev.target.dataset.color}));
    /*
    DataTransfer object 
      Is used to hold the data that is being dragged during a drag and drop operation.

    DataTransfer.setData()
      Set the data for a given type. 
      If data for the type does not exist, it is added at the end, such that the last item in the types list will be the new format. 
      If data for the type already exists, the existing data is replaced in the same position.
    */
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
    //Set the background to original color on droping the piece:
    ev.target.style.backgroundColor = ev.target.dataset.squarecolor
    //Save moving piece data into an object:
    let movingPiece = JSON.parse(ev.dataTransfer.getData("Text"))
    console.log(movingPiece.color, ev.target?.dataset?.color, ev.target.nodeName)
    if ((movingPiece.color === 'white' && ev.target?.dataset?.color === 'black' && ev.target.nodeName === 'IMG') ||
        (movingPiece.color === 'black' && ev.target?.dataset?.color === 'white' && ev.target.nodeName === 'IMG')) 
    {
      ev.target.parentNode.append(document.getElementById(movingPiece.id)); 
      ev.target.remove()
    }
    if (ev.target.nodeName === 'DIV') {
      ev.target.append(document.getElementById(movingPiece.id)); 
    }

    /*
    DataTransfer object 
      Is used to hold the data that is being dragged during a drag and drop operation.

    DataTransfer.getData()
      Retrieves the data for a given type, or an empty string if data for that type does not exist 
      or the data transfer contains no data
    */
  }


