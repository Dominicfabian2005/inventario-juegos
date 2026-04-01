import React, { useState, useEffect } from "react";
import "../styles/ListaStyle.css";

function Lista() {
  const [editando, setEditando] = useState(null);
  const [editData, setEditData] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [juegos, setJuegos] = useState([]);

  const cargarJuegos = () => {
    fetch('http://localhost:3001/api/juegos')
      .then(res => res.json())
      .then(data => setJuegos(data))
      .catch(err => console.error('Error:', err));
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  const juegosFiltrados = juegos.filter((juego) =>
    juego.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const eliminarJuego = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este juego?")) {
      await fetch(`http://localhost:3001/api/juegos/${id}`, { method: 'DELETE' });
      setJuegos(juegos.filter(j => j.id !== id));
    }
  };

  const iniciarEdicion = (juego) => {
    setEditando(juego.id);
    setEditData({ ...juego });
  };

  const guardarEdicion = async (id) => {
    await fetch(`http://localhost:3001/api/juegos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    });
    setEditando(null);
    cargarJuegos();
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div id="contenedor-lista">
        <h2>INVENTARIO DE JUEGOS</h2>
        <span>lista de juegos registrados</span>

        <div id="buscador-wrapper">
          <span id="icono-lupa">&#128269;</span>
          <input
            id="buscador"
            type="text"
            placeholder="Buscar juego..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div id="tabla-wrapper">
          <table id="tabla-juegos">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Plataforma</th>
                <th>Género</th>
                <th>Año</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegosFiltrados.map((juego) => (
                <tr key={juego.id}>
                  <td>{String(juego.id).padStart(3, "0")}</td>
                  <td>{editando === juego.id ? <input className="input-inline" name="nombre" value={editData.nombre} onChange={handleEditChange} /> : juego.nombre}</td>
                  <td>{editando === juego.id ? (
                    <select className="input-inline" name="plataforma" value={editData.plataforma} onChange={handleEditChange}>
                      <option>PS5</option>
                      <option>Xbox</option>
                      <option>PC</option>
                      <option>Nintendo Switch</option>
                    </select>
                  ) : <span className="badge-plataforma">{juego.plataforma}</span>}</td>
                  <td>{editando === juego.id ? (
                    <select className="input-inline" name="genero" value={editData.genero} onChange={handleEditChange}>
                      <option>Acción</option>
                      <option>RPG</option>
                      <option>Shooter</option>
                      <option>Estrategia</option>
                      <option>Aventura</option>
                    </select>
                  ) : <span className="badge-genero">{juego.genero}</span>}</td>
                  <td>{editando === juego.id ? <input className="input-inline" name="anio" type="number" value={editData.anio} onChange={handleEditChange} /> : juego.anio}</td>
                  <td>{editando === juego.id ? (
                    <select className="input-inline" name="estado" value={editData.estado} onChange={handleEditChange}>
                      <option>Disponible</option>
                      <option>Prestado</option>
                    </select>
                  ) : <span className={`badge-estado ${juego.estado.toLowerCase()}`}>{juego.estado}</span>}</td>
                  <td>
                    <div className="acciones">
                      {editando === juego.id ? (
                        <>
                          <button className="btn-editar" onClick={() => guardarEdicion(juego.id)}>Guardar</button>
                          <button className="btn-eliminar" onClick={() => setEditando(null)}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-editar" onClick={() => iniciarEdicion(juego)}>Editar</button>
                          <button className="btn-eliminar" onClick={() => eliminarJuego(juego.id)}>Eliminar</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Lista;