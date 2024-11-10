import React, { SetStateAction, useEffect } from 'react'

interface EditNoteInput {
  editedNoteText: string
  setEditMode: (bool: boolean) => void
  controlContainer: React.RefObject<HTMLDivElement>
  setEditNoteMode: (prev: boolean) => void
  setEditedNoteText: (str: string) => void
  currentNoteKey: string
  editNoteInputRef: React.RefObject<HTMLInputElement>
  editNoteMode: boolean
  editMode: boolean
}

const EditNoteInput: React.FC<EditNoteInput> = ({
  editedNoteText,
  setEditMode,
  controlContainer,
  setEditNoteMode,
  setEditedNoteText,
  currentNoteKey,
  editNoteInputRef,
  editNoteMode,
  editMode,
}) => {
  const saveNoteNameChange = (key: string) => {
    const storedNote = localStorage.getItem(key)
    if (storedNote) {
      const noteData = JSON.parse(storedNote)
      noteData.name = editedNoteText
      localStorage.setItem(key, JSON.stringify(noteData))
      setEditMode(false)
      if (controlContainer.current) {
        controlContainer.current.style.display = 'flex'
      }
    } else {
      console.error(`No note found for key: ${key}`)
    }
    setEditNoteMode(false)
  }

  useEffect(() => {
    if (editMode === true)
      if (!editNoteMode && controlContainer.current) {
        controlContainer.current.style.display = 'none'
      }
  }, [editNoteMode])

  useEffect(() => {
    if (editNoteInputRef.current) {
      editNoteInputRef.current.focus()
    }
  }, [editNoteMode])

  const handleEditedNoteTextChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setEditedNoteText(event.target.value.toString())
  }

  return (
    <>
      <input
        type="text"
        value={editedNoteText}
        onChange={handleEditedNoteTextChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            saveNoteNameChange(currentNoteKey)
          } else if (event.key === 'Escape') {
            setEditNoteMode(false)
          }
        }}
        ref={editNoteInputRef}
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

export default EditNoteInput
