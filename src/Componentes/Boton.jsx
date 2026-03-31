import { useState } from "react";
import Formulario from "./form";
import Lista from "./Lista";
import "../styles/BotonStyle.css";


function Boton() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <>
      {mostrar ? (
        <div id="vista-formulario">
          <button id="btn-volver" onClick={() => setMostrar(false)}>
            ← Volver
          </button>
          <Formulario />
        </div>
      ) : (
        <div id="vista-lista">
          <div id="header-lista">
            <button id="btn-agregar" onClick={() => setMostrar(true)}>
              + Agregar Juego
            </button>
          </div>
          <Lista />
        </div>
      )}
    </>
  );
}

export default Boton;