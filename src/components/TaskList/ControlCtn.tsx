import AddNote from './AddNote'
import { useEffect, useRef } from 'react'
import EditNote from './EditNote'

interface ControlCtnProps {
  noteKeys: string[]
  editNoteMode: boolean
  controlContainer: React.RefObject<HTMLDivElement>
  newNoteInputRef: React.RefObject<HTMLInputElement>
  isNewNoteInputVisible: boolean
  setNewNoteInputVisible: (visible: boolean) => void
  editMode: boolean
  setEditMode: (editMode: boolean) => void
}

const ControlCtn: React.FC<ControlCtnProps> = ({
  noteKeys,
  editNoteMode,
  controlContainer,
  newNoteInputRef,
  isNewNoteInputVisible,
  setNewNoteInputVisible,
  editMode,
  setEditMode,
}) => {
  const addIconReference = useRef<SVGSVGElement>(null)
  const listIconReference = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isNewNoteInputVisible && newNoteInputRef.current) {
      newNoteInputRef.current.focus()
    }
  }, [isNewNoteInputVisible])

  const toggleNewNoteInputVisibility = () => {
    if (controlContainer.current) {
      controlContainer.current.style.display = 'none'
    }
    setNewNoteInputVisible(!isNewNoteInputVisible)
  }

  const toggleEditMenu = () => {
    if (Array.isArray(noteKeys) && noteKeys.length === 0) {
      return null
    } else if (location.pathname !== '/') {
      if (controlContainer.current)
        controlContainer.current.style.display = 'none'
      setEditMode(!editMode)
    } else {
      if (controlContainer.current)
        controlContainer.current.style.display = 'none'
      setEditMode(!editMode)
    }
  }

  const editNoteInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editNoteInputRef.current) {
      editNoteInputRef.current.focus()
    }
  }, [editNoteMode])

  useEffect(() => {
    if (editMode === true)
      if (!editNoteMode && controlContainer.current) {
        controlContainer.current.style.display = 'none'
      }
  }, [editNoteMode])
  return (
    <>
      <div ref={controlContainer}>
        <EditNote 
          HandleClick={toggleEditMenu} 
          ref={listIconReference} 
        />
        <AddNote
          HandleClick={toggleNewNoteInputVisibility}
          ref={addIconReference}
        />
      </div>
    </>
  )
}

export default ControlCtn
