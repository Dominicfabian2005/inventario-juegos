import React, { useState } from "react";
import "../styles/ListaStyle.css";

function Lista() {
  const [editando, setEditando] = useState(false);

  return (
    <>
      <div id="contenedor-lista">
        <h2>INVENTARIO DE JUEGOS</h2>
        <span>lista de juegos registrados</span>

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
              <tr>
                <td>001</td>
                <td>{editando ? <input className="input-inline" defaultValue="Juego de ejemplo" /> : "Juego de ejemplo"}</td>
                <td>{editando ? <select className="input-inline"><option>PS5</option><option>Xbox</option><option>PC</option></select> : <span className="badge-plataforma">PS5</span>}</td>
                <td>{editando ? <select className="input-inline"><option>Acción</option><option>RPG</option><option>Shooter</option></select> : <span className="badge-genero">Acción</span>}</td>
                <td>{editando ? <input className="input-inline" type="number" defaultValue="2024" /> : "2024"}</td>
                <td>{editando ? <select className="input-inline"><option>Disponible</option><option>Prestado</option></select> : <span className="badge-estado disponible">Disponible</span>}</td>
                <td>
                  <div className="acciones">
                    {editando ? (
                      <>
                        <button className="btn-editar" onClick={() => setEditando(false)}>Guardar</button>
                        <button className="btn-eliminar" onClick={() => setEditando(false)}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button className="btn-editar" onClick={() => setEditando(true)}>Editar</button>
                        <button className="btn-eliminar">Eliminar</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Lista