import React, { useState, useEffect } from "react";
import s from "./LadingPage.module.css";
import { useNavigate } from "react-router-dom";

export default function LadingPage() {
  const navigate = useNavigate();

  // estado para mostrar el mensaje
  const [showMessage, setShowMessage] = useState(false);
  // estado para controlar el desvanecimiento
  const [fade, setFade] = useState(false); 

  useEffect(() => {
    // Temporizador para mostrar el msj
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    // Limpiamos el temporizador si el componente se desmonta antes de que se cumpla el tiempo
    return () => clearTimeout(timer);
  }, []);

  function handleContinue() {
    setFade(true); // activa la animación de desvanecimiento

    setTimeout(() => {
      navigate("/home"); // redirige al home después de "x" segundos
    }, 3500);
  }

  return (
    <div className={s.divLP}>
        {showMessage && (
          <div className={s.message}>
            <h2>Are you ready for a new adventure?</h2>
            <button className={s.continueBtn} onClick={handleContinue}>
            Yes, let's go
            </button>
          </div>
        )}
      {fade && <div className={s.fadeOut}></div>}
      <div className={s.divTextBtn}>
      </div>
    </div>
  );
}