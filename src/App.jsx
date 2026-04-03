import { useState } from 'react'
import Boton from './Componentes/Boton'
import Login from './Componentes/Login'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem("username"));

  const handleLogin = (username) => {
    setUsuario(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsuario(null);
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <div id="header-app">
        <span>Bienvenido, {usuario}</span>
        <button id="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <Boton />
    </>
  );
}

export default App