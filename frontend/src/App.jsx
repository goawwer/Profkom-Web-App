import { useState } from 'react'
import LayoutProvider from './components/router/LayoutProvider'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
      <LayoutProvider/>
  )
}

export default App
