import { useState } from 'react'
import LayoutProvider from './components/router/LayoutProvider'
import './App.scss'
import { UserProvider} from './components/context/UserContext'

function App() {
  return (
    <UserProvider>
      <LayoutProvider/>
    </UserProvider>
  )
}

export default App
