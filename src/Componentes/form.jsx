import React, { useState } from "react";
import "../styles/formStyle.css";

function Formulario({ juegoEditar, onGuardar }) {
  const [formData, setFormData] = useState(
    juegoEditar || {
      nombre: '',
      plataforma: '',
      genero: '',
      anio: new Date().getFullYear(),
      estado: ''
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = juegoEditar
        ? `http://localhost:3001/api/juegos/${juegoEditar.id}`
        : 'http://localhost:3001/api/juegos';
      const method = juegoEditar ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(juegoEditar ? 'Juego actualizado exitosamente' : 'Juego agregado exitosamente');
        setFormData({
          nombre: '',
          plataforma: '',
          genero: '',
          anio: new Date().getFullYear(),
          estado: ''
        });
        if (onGuardar) onGuardar();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1>{juegoEditar ? 'EDITAR JUEGO' : 'AGREGAR NUEVO JUEGO'}</h1>
      <span>-panel de inventario-</span>
      <div id="contenedor-formulario">
        <label>Nombre:</label>
        <input
          name="nombre"
          placeholder="agrega un nuevo juego"
          value={formData.nombre}
          onChange={handleChange}
        />
        <label>Plataforma:</label>
        <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="PS5">PS5</option>
          <option value="Xbox">Xbox</option>
          <option value="PC">PC</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
        <label>Género</label>
        <select name="genero" value={formData.genero} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Shooter">Shooter</option>
          <option value="RPG">RPG</option>
        </select>
        <label>Año</label>
        <input
          type="number"
          name="anio"
          min="1970"
          max="2026"
          value={formData.anio}
          onChange={handleChange}
        />
        <label>Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="">Selecciona una opción</option>
          <option value="Disponible">Disponible</option>
          <option value="Prestado">Prestado</option>
        </select>
        <button id="btn-enviar" onClick={handleSubmit}>
          {juegoEditar ? 'ACTUALIZAR' : 'GUARDAR'}
        </button>
      </div>
    </>
  );
}

export default Formulario;