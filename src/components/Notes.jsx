import React, { createRef, useEffect, useRef, useState } from 'react'
import { Note } from './Note'

function Notes({ notes = [], setNotes = () => { } }) {
	useEffect(() => {
		// to prevent intial reset of localStore of sticky notes
		if (notes.length) {
			const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
			const updatedNotes = notes.map(note => {
				const savedNote = savedNotes.find((n) => n.id == note.id);
				if (savedNote) {
					return savedNote
				} else {
					const position = determineNewPosition()
					return { ...note, position }
				}
			})
			setNotes(updatedNotes)
			localStorage.setItem("notes", JSON.stringify(updatedNotes))
		}
	}, [notes.length])

	const noteRefs = useRef([])
	const determineNewPosition = () => {
		const maxX = window.innerWidth - 250;
		const maxY = window.innerHeight - 250;

		return {
			x: Math.floor(Math.random() * maxX),
			y: Math.floor(Math.random() * maxY)
		}
	}
	const handleDragStart = (note, e) => {
		const { id } = note;
		const noteRef = noteRefs.current[id].current;
		const rect = noteRef.getBoundingClientRect();
		const offsetX = e.clientX - rect.left;
		const offsetY = e.clientY - rect.top;

		const startPos = note.position;

		const handleMouseMove = (e) => {
			const newX = e.clientX - offsetX;
			const newY = e.clientY - offsetY;
			noteRef.style.left = `${newX}px`;
			noteRef.style.top = `${newY}px`;
		}
		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			const finalRect = noteRef.getBoundingClientRect()
			const newPosition = { x: finalRect.left, y: finalRect.top };

			if (false) {
				// check overlap
			} else {
				updateNoteposition(id, newPosition)
			}
		}

		const updateNoteposition = (id, newPosition) => {
			const updatedNotes = notes.map(note => note.id === id ? { ...note, position: newPosition } : note)
			setNotes(updatedNotes)
			localStorage.setItem("notes", JSON.stringify(updatedNotes))
		}

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		// Add equivalent touch events
		document.addEventListener('touchmove', handleMouseMove);
		document.addEventListener('touchend', handleMouseUp);

		// Optionally, add touchcancel to handle cases where the touch is interrupted
		document.addEventListener('touchcancel', handleMouseUp);

	}

	return <div>
		{notes.map((note) => {
			return <Note
				key={note.id}
				ref={
					noteRefs.current[note.id] ?
						noteRefs.current[note.id] :
						(noteRefs.current[note.id] = createRef())
				}
				initialPos={note.position}
				content={note.text}
				onMouseDown={(e) => handleDragStart(note, e)}
				onTouchStart={(e) => handleDragStart(note, e)}
			/>

		})}
	</div>
}

export { Notes }