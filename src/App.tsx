import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Main } from './Barrel'
import TaskList from './components/TaskList/TaskList'
import UserForm from './components/UserForm'
import TaskContent from './components/TaskContent'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(false)

  useEffect(() => {
    const checkStorageAccess = async () => {
      try {
        if (await document.hasStorageAccess()) {
          const username = window.localStorage.getItem('username')
          if (!username) {
            setForm(true)
          }
        } else {
          throw new Error("Can't get access to the local storage")
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkStorageAccess()
  }, [])

  return (
    <>
      <div className="main-ctn">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <TaskList open={open} setOpen={setOpen} />
          <Main open={open}>
            {location.pathname === '/' ? null : <TaskContent />}
          </Main>
        </Box>
        <UserForm form={form} />
      </div>
    </>
  )
}

export default App
