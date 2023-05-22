import React, { useState, useEffect } from "react";
import s from "./LadingPage.module.css";
import { useNavigate } from "react-router-dom";

export default function LadingPage() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function handleContinue() {
    setFade(true); // Activa la animación de desvanecimiento

    setTimeout(() => {
      navigate("/home");
    }, 4000); // Espera 1 segundo antes de redirigir
  }

  return (
    <div className={s.divLP}>
      {fade && <div className={s.fadeOut}></div>}
      <div className={s.divTextBtn}>
        {showMessage && (
          <div className={s.message}>
            <h2>Are you ready for a new adventure?</h2>
            <button className={s.continueBtn} onClick={handleContinue}>
            Yes, let's go
            </button>
          </div>
        )}
      </div>
    </div>
  );
}