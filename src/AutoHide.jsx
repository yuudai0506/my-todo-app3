import { useState, useEffect } from 'react'

function AutoHide({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(id)
  }, [])

  if (!visible) return null
  return <p>{message}</p>
}

export default AutoHide
