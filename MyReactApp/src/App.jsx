import { useState, useEffect, createElement,useRef } from 'react';
import './App.css'

function App() {

  const [text, settext] = useState();

  const inside= ()=>{
    settext();
  }

  return (
    <>
      <div className='to-do'>
        <input type="text" placeholder='Enter a task' onChange={inside()} />
        <button onClick={addTask}>ADD</button>
      </div>
      {task}
    </>
  )
}
export default App
