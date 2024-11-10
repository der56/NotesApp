import { TextField } from '@mui/material'
import { DrawerHeader } from '../Barrel'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const TaskContent: React.FC = () => {
  const location = useLocation()
  const [taskContent, setTaskContent] = useState('')

  useEffect(() => {
    const content = localStorage.getItem(location.pathname.replace(/\//, ''))
    if (location.pathname === '/') {
      return
    } else if (content) {
      setTaskContent(JSON.parse(content).content)
    }
  }, [location.pathname])

  const handleContentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value
    setTaskContent(newContent)
    const rekey = JSON.parse(
      localStorage.getItem(location.pathname.replace(/\//, ''))!
    ).name
    localStorage.setItem(
      location.pathname.replace(/\//, ''),
      JSON.stringify({ name: rekey, content: `${newContent}` })
    )
  }

  return (
    <>
      <DrawerHeader />
      <TextField
        value={taskContent}
        onChange={handleContentChange}
        multiline
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2, maxHeight: '82vh', overflow: 'auto' }}
      />
    </>
  )
}

export default TaskContent
