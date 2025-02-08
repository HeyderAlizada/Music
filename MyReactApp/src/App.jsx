import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [color, setcolor] = useState("blue");

  return (
    <>
      <h1 color='white'>I like <span style={{color : color}}>{color}</span> </h1>
      <button onClick={() => { setcolor(color === "blue" ? "red" : "blue") }}>change to {color === "blue" ? "red" : "blue"}</button>
    </>
  )
}
export default App
