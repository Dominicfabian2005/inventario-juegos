import React, { useState } from "react";
import "../styles/ListaStyle.css";

function Lista() {
  const [editando, setEditando] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const juegos = [
    { id: 1, nombre: "God of War Ragnarök", plataforma: "PS5", genero: "Acción", anio: 2022, estado: "Disponible" },
    { id: 2, nombre: "Elden Ring", plataforma: "PC", genero: "RPG", anio: 2022, estado: "Prestado" },
    { id: 3, nombre: "Halo Infinite", plataforma: "Xbox", genero: "Shooter", anio: 2021, estado: "Disponible" },
    { id: 4, nombre: "Civilization VI", plataforma: "PC", genero: "Estrategia", anio: 2016, estado: "Disponible" },
  ];

  const juegosFiltrados = juegos.filter((juego) =>
    juego.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div id="contenedor-lista">
        <h2>INVENTARIO DE JUEGOS</h2>
        <span>lista de juegos registrados</span>

        <input
          id="buscador"
          type="text"
          placeholder="Buscar juego..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

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
                  <td>{editando === juego.id ? <input className="input-inline" defaultValue={juego.nombre} /> : juego.nombre}</td>
                  <td>{editando === juego.id ? <select className="input-inline"><option>PS5</option><option>Xbox</option><option>PC</option></select> : <span className="badge-plataforma">{juego.plataforma}</span>}</td>
                  <td>{editando === juego.id ? <select className="input-inline"><option>Acción</option><option>RPG</option><option>Shooter</option></select> : <span className="badge-genero">{juego.genero}</span>}</td>
                  <td>{editando === juego.id ? <input className="input-inline" type="number" defaultValue={juego.anio} /> : juego.anio}</td>
                  <td>{editando === juego.id ? <select className="input-inline"><option>Disponible</option><option>Prestado</option></select> : <span className={`badge-estado ${juego.estado.toLowerCase()}`}>{juego.estado}</span>}</td>
                  <td>
                    <div className="acciones">
                      {editando === juego.id ? (
                        <>
                          <button className="btn-editar" onClick={() => setEditando(null)}>Guardar</button>
                          <button className="btn-eliminar" onClick={() => setEditando(null)}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-editar" onClick={() => setEditando(juego.id)}>Editar</button>
                          <button className="btn-eliminar" onClick={() => window.confirm("¿Estás seguro de que deseas eliminar este juego?")}>Eliminar</button>
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

export default Lista