import React, { useState } from "react";
import "../styles/LoginStyle.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      onLogin(data.username);
    } catch (err) {
  console.log("ERROR:", err);
  setError("No se pudo conectar al servidor");
}

  };

  return (
    <div id="login-page">
      <div className="login-card">
        <h1>Inventario de Juegos</h1>
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Usuario:</label>
          <input
            id="input-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
          />
          <label>Contraseña:</label>
          <input
            id="input-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
          {error && <p id="login-error">{error}</p>}
          <button id="btn-login" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;