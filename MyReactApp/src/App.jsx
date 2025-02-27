import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const addTask = () => {
    if (text.trim() !== "") {
      setTasks([...tasks, text]);
      setText("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
    <div className='container'>
      <h1>To-Do List</h1>
      <div className='input-container'>
        <input
          maxLength={20}
          type='text'
          placeholder='Enter a task'
          value={text}
          onChange={handleChange}
        />
        <button onClick={addTask} className='add'>ADD</button>
      </div>
      
    </div>
    <h3>Tasks</h3>
      <div className='task-list'>
        {tasks.map((task, index) => (
          <div className='task' key={index}>
            <div className="sol"><span className='task-index'>{index + 1}</span>
            <h4 className='task-text'>{task}</h4></div>
            <button onClick={() => deleteTask(index)} className='delete-btn'>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;