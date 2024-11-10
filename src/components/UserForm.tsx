import Button from '@mui/material/Button'
import TextField, {
  TextFieldPropsColorOverrides,
} from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { OverridableStringUnion } from '@mui/types'

interface UserFormProps {
  form: boolean
}

const UserForm = ({ form }: UserFormProps) => {
  const [user, setUser] = useState('')
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const inputForm = useRef<HTMLInputElement | null>(null)
  const [label, setLabel] = useState('Username')

  const [color, setColor] =
    useState<
      OverridableStringUnion<
        'primary' | 'error' | 'secondary' | 'info' | 'success' | 'warning',
        TextFieldPropsColorOverrides
      >
    >('primary')

  function HandleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUser(e.target.value)
    if (e.target.value.length > 10) {
      setLabel('The username must be less than 10 characters.')
      setColor('error')
    } else {
      setLabel('Username')
      setColor('primary')
    }
  }

  function HandleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (user.length < 11 && user.length !== 0) {
      window.localStorage.setItem('username', user)
      setIsVisible(false)
    } else if (user.length === 0) {
      alert('Please, enter a username.')
    } else {
      alert('Your username must be less than 10 characters.')
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Dialog open={form}>
      <DialogTitle>Create a username.</DialogTitle>
      <DialogContent>
        <DialogContentText>
        To identify yourself, we prefer that you create a new username,
        which cannot exceed 10 characters.
        </DialogContentText>
        <form action="">
          <TextField
            autoFocus
            required
            margin="dense"
            name="Username"
            label={label}
            color={color}
            type="text"
            fullWidth
            variant="standard"
            onChange={HandleChange}
            inputRef={inputForm}
          />

          <DialogActions>
            <Button type="submit" onClick={HandleSubmit}>
              Ok
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm
