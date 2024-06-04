import { useState, useEffect } from 'react'
import './App.css'
import { Notes } from './components/Notes'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes)
  }, [])


  const [inputText, setInputText] = useState('');

  const handleAddNote = () => {
    if (inputText.trim() !== '') {
      const newNote = {
        id: notes.length + 1,
        text: inputText
      };
      setNotes([...notes, newNote]);
      setInputText('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddNote();
    }
  };

  const handleDeleteAll = () => {
    const shouldDelete = window.confirm('Are you sure you want to delete all notes?');
    if (shouldDelete) {
      localStorage.removeItem('notes');
      setNotes([]);
    }
  };


  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your note here"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddNote}>Stick it</button>
        <button onClick={handleDeleteAll}
          style={{ background: '#d9534f', color: 'white' }}
        >Delete All</button>
      </div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App
