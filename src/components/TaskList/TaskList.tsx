import { Divider, Drawer, styled } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { DrawerHeader, drawerWidth } from '../../Barrel'
import { useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import '../styles/task_list.css'
import { useState, useRef } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ControlCtn from './ControlCtn'
import NewNoteInput from './NewNoteInput'
import EditNoteInput from './EditNoteInput'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

interface TaskListProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const NoteList = ({ open, setOpen }: TaskListProps) => {
  const theme = useTheme()
  const user = window.localStorage.getItem('username')
  const controlContainer = useRef<HTMLDivElement>(null)

  /*   useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (open && (activeElement?.tagName !== 'INPUT')) {
        if (e.key === 'Escape') {
          closeDrawer()
        }
      }
    })

  }) */

  const closeDrawer = () => {
    if (editMode) {
      setEditMode(false)
      if (controlContainer.current) {
        if (controlContainer.current.style.display === 'none') {
          controlContainer.current.style.display = 'flex'
        }
      }
    }
    if (isNewNoteInputVisible) {
      setNewNoteInputVisible(false)
      if (controlContainer.current) {
        if (controlContainer.current.style.display === 'none') {
          controlContainer.current.style.display = 'flex'
        }
      }
    }
    if (editNoteMode) {
      setEditNoteMode(false)
      if (controlContainer.current) {
        if (controlContainer.current.style.display === 'none') {
          controlContainer.current.style.display = 'flex'
        }
      }
    }
    setOpen(false)
  }

  const openDrawer = () => {
    setOpen(true)
  }

  const [noteKeys, setNoteKeys] = useState<string[]>(() => {
    return Object.keys(localStorage).filter(
      (key) => key !== 'username' && key !== 'taskRoutes'
    )
  })

  const newNoteInputRef = useRef<HTMLInputElement>(null)
  const [isNewNoteInputVisible, setNewNoteInputVisible] = useState(false)

  const [editMode, setEditMode] = useState(false)
  const editAnchorReference = useRef<HTMLAnchorElement>(null)
  const [currentNoteKey, setCurrentNoteKey] = useState('')

  const [editNoteMode, setEditNoteMode] = useState(false)
  const [editedNoteText, setEditedNoteText] = useState('')

  const startEditingNote = (key: string) => {
    setCurrentNoteKey(key)
    const existingNote = localStorage.getItem(key)
    if (existingNote) {
      setEditedNoteText(JSON.parse(existingNote).name)
    }
    setEditNoteMode(true)
  }

  const editNoteInputRef = useRef<HTMLInputElement>(null)


  const navigateTo = useNavigate()
  const removeNote = (key: string) => {
    if (location.pathname !== '/') {
      navigateTo('/')
    }
    localStorage.removeItem(key)
    setNoteKeys((prevKeys) => prevKeys.filter((noteKey) => noteKey !== key))
    setEditMode(!editMode)
    if (controlContainer.current) {
      controlContainer.current.style.display = 'flex'
    }
  }

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            edge="start"
            sx={[{ mr: 2 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {location.pathname !== '/'
              ? JSON.parse(
                  localStorage.getItem(location.pathname.replace(/\//, ''))!
                ).name
              : ''}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <span style={{ position: 'absolute', left: '5%' }}>{user}</span>
          <IconButton onClick={closeDrawer}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {!editNoteMode ? (
          <>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '50px' }}>
              {noteKeys.map((key) => {
                const eachNoteData = localStorage.getItem(key)
                const parsedNote = JSON.parse(eachNoteData!)

                return (
                  <div key={key}>
                    {!editMode ? (
                      <Link
                        className="note-anchor"
                        to={
                          location.pathname !== `/${key}`
                            ? `${location.origin}/${key}`
                            : ''
                        }
                        ref={editAnchorReference}
                      >
                        <Typography noWrap component="div" className="note">
                          {parsedNote.name}
                        </Typography>
                      </Link>
                    ) : (
                      <>
                        <div className="note-menu-ctn">
                          <Typography
                            noWrap
                            component="div"
                            className="note-in-menu"
                          >
                            {parsedNote.name}
                          </Typography>
                          <div className="options-in-menu">
                            <EditIcon
                              className="edit-icon"
                              onClick={() => startEditingNote(key)}
                            />
                            <DeleteIcon
                              color={'error'}
                              className="delete-icon"
                              onClick={() => removeNote(key)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
              {isNewNoteInputVisible && (
                <NewNoteInput
                  newNoteInputRef={newNoteInputRef}
                  controlContainer={controlContainer}
                  setNoteKeys={setNoteKeys}
                  setNewNoteInputVisible={setNewNoteInputVisible}
                />
              )}
            </div>
            <ControlCtn
              noteKeys={noteKeys}
              editNoteMode={editNoteMode}
              controlContainer={controlContainer}
              newNoteInputRef={newNoteInputRef}
              isNewNoteInputVisible={isNewNoteInputVisible}
              setNewNoteInputVisible={setNewNoteInputVisible}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </>
        ) : (
          <>
            <EditNoteInput 
              editedNoteText={editedNoteText}
              setEditMode={setEditMode}
              controlContainer={controlContainer}
              setEditNoteMode={setEditNoteMode}
              setEditedNoteText={setEditedNoteText}
              currentNoteKey={currentNoteKey}
              editNoteInputRef={editNoteInputRef}
              editNoteMode={editNoteMode}
              editMode={editMode}
            />
          </>
        )}
      </Drawer>
    </>
  )
}

export default NoteList
