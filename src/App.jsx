import { useState } from 'react'
import Formulario from './Componentes/form'
import Lista from './Componentes/Lista'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Lista/>
    </>
  )
}

export default App
