import React, { useState } from 'react'
import { useRoutes } from '../../main'
import { v4 as uuid } from 'uuid'

interface NewNoteInputProps {
  newNoteInputRef: React.RefObject<HTMLInputElement>
  controlContainer: React.RefObject<HTMLDivElement>
  setNoteKeys: (prevKeys: (prevKeys: string[]) => string[]) => void
  setNewNoteInputVisible: (visible: boolean) => void
}

const NewNoteInput: React.FC<NewNoteInputProps> = ({
  newNoteInputRef,
  controlContainer,
  setNoteKeys,
  setNewNoteInputVisible,
}) => {
  const { addNoteRoute } = useRoutes()

  const [newNoteText, setNewNoteText] = useState('')

  const handleNewNoteTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewNoteText(event.target.value)
  }

  const handleNewNoteKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      if (controlContainer.current) {
        controlContainer.current.style.display = 'flex'
      }
      const newNoteId = uuid()
      const newRoute = { name: newNoteText, content: '' }
      localStorage.setItem(newNoteId, JSON.stringify(newRoute))
      setNoteKeys((prevKeys: string[]) => [...prevKeys, newNoteId])
      setNewNoteInputVisible(false)
      setNewNoteText('')
      addNoteRoute(newNoteId)
    } else if (event.key === 'Escape') {
      if (controlContainer.current) {
        controlContainer.current.style.display = 'flex'
      }
      setNewNoteInputVisible(false)
      setNewNoteText('')
    }
  }
  return (
    <>
      <input
        type="text"
        value={newNoteText}
        onChange={handleNewNoteTextChange}
        onKeyDown={handleNewNoteKeyDown}
        ref={newNoteInputRef}
        placeholder="Escribe tu nota aquí..."
        style={{
          width: '90%',
          margin: '10px',
          padding: '5px',
          background: 'transparent',
          outline: 'none',
          color: 'black',
          border: 'none',
        }}
      />
    </>
  )
}

export default NewNoteInput
