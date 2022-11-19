import './App.css'
import Board from './components/board'

function App() {


  return (
    <div className="App">
      <img src="./logo/chess_logo.png" alt='chess_logo' style={{position: 'absolute', top:'100px'}}></img>
      <h2 style={{color:'white'}}>White to move</h2>
      <div style={{display:'flex', width:480, height:480, flexWrap: 'wrap', cursor:'pointer'}} className="board" id="boardContainer">
        <Board></Board>
      </div>
    </div>
  )
} 

export default App
