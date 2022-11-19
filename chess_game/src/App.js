import './App.css'
import Board from './components/board'
import React from 'react';
import { useState } from 'react';
//Refactor later with React.createcontext for passing down props like the Player/Color to move

function App() {
  let [colorToMove, setColorToMove] = useState("white")
  return (
    <div className="App">
      <img src="./logo/chess_logo.png" alt='chess_logo' style={{position: 'absolute', top:'100px'}}></img>
      <h2 style={{color:'white'}}>{colorToMove} to play </h2>
      <div style={{display:'flex', width:480, height:480, flexWrap: 'wrap', cursor:'pointer'}} className="board" id="boardContainer">
        <Board colorToMove={colorToMove} setColorToMove={setColorToMove}></Board>
      </div>
    </div>
  )
} 

export default App
