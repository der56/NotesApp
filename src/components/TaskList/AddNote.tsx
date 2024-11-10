import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd'

type ToggleNewNoteInputVisibility = () => void

interface AddNoteProps {
  HandleClick: ToggleNewNoteInputVisibility
}

const AddNote = React.forwardRef<SVGSVGElement, AddNoteProps>(
  ({ HandleClick }, ref) => {
    return (
      <div className="add-btn-ctn">
        <PostAddIcon onClick={HandleClick} ref={ref} className="add-btn" />
      </div>
    )
  }
)

AddNote.displayName = 'AddNote'

export default AddNote
