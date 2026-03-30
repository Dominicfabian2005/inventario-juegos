import React from "react";
import "../styles/formStyle.css";

function Formulario() {
  return (
    <>
    <div className="grid-bg"></div>
<h1>AGREGAR NUEVO JUEGO</h1>
<span>-panel de inventario-</span>
<div id="contenedor-formulario">
  <label>Nombre:</label>
  <input placeholder="agrega un nuevo juego"></input>
  <label>plataforma:</label>
 <select>
  <option value="">Selecciona una opción</option>
  <option value="ps5">PS5</option>
  <option value="xbox">Xbox</option>
  <option value="pc">PC</option>
  <option value="switch">Nintendo Switch</option>
</select>
<label>Genero</label>
<select>
  <option value="">Selecciona una opción</option>
  <option value="Accion">Accion</option>
  <option value="Aventura">Aventura</option>
  <option value="Puzzle">Puzzle</option>
  <option value="shooter">Shooter</option>
   <option value="Rpg">Rpg</option>
</select>
   
   <label>Año</label>
  <input 
  type="number" 
  min="1970" 
  max="2025" 
  defaultValue={new Date().getFullYear()} 
/>
   
      <button id="btn-enviar">GUARDAR</button>

</div>
</>
  );
}

export default Formulario;