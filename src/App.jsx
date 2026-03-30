import { useState } from 'react'
import Formulario from './Componentes/form'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Formulario/>
    </>
  )
}

export default App
