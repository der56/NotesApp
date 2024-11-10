import { useState, useEffect } from 'react'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const Code404 = () => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await delay(2000)
      setShowMessage(true)
    }
    fetchData()
  }, [])

  return showMessage ? (
    <h1 style={{ paddingTop: '30px', whiteSpace: 'break-spaces' }}>
      Página no encontrada.
    </h1>
  ) : null
}

export default Code404
