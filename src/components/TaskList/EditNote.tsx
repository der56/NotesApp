import React from 'react'
import ListIcon from '@mui/icons-material/List'

type toggleEditMenu = () => void

interface EditNoteProps {
  HandleClick: toggleEditMenu
}

const EditNote = React.forwardRef<SVGSVGElement, EditNoteProps>(
  ({ HandleClick }, ref) => {
    return (
      <>
      <div className='menu-btn-ctn'>
        <ListIcon
          onClick={HandleClick}
          ref={ref}
          className="menu-btn"
        />
        </div>
      </>
    )
  }
)

EditNote.displayName = 'EditNote'

export default EditNote
