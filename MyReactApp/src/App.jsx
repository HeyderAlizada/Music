import { useState, useEffect, createElement, useRef } from 'react';
import './App.css'

function App() {

  const [text, settext] = useState("");
  const [tasks, settasks] = useState([]);
  const handleChange = (event) => {
    settext(event.target.value);
  }

  const addTask = () => {
    if (text.trim() !== "") {
      settasks([...tasks, text]);
      settext("");
    }
  }

  return (
    <>
      <div className='to-do'>
        <input type="text" placeholder='Enter a task' value={text} onChange={handleChange} />
        <button onClick={addTask}>ADD</button>
      </div>
      <div className="listof">
        <ul>
          {tasks.map((task, index) => (
            <div className="lists"><li key={index}>{index+1}) {task}</li><button>Delete</button></div>
          ))}
        </ul>
      </div>
    </>
  )
}
export default App
