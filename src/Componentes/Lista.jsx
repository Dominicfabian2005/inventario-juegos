import React from "react";
import "../styles/ListaStyle.css";

function Lista(){
    return(
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
              </tbody>
            </table>
          </div>
        </div>
        </>
    )
}

export default Lista