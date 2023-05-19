import React, { useState, useEffect } from "react";
import s from "./LadingPage.module.css";
import WELCOME from "../../assets/WELCOME.png"
import { useNavigate } from "react-router-dom";

export default function LadingPage() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  function handlerSubmit(e) {
    e.preventDefault();
    // ...
    setFade(true); // Activa la animación de desvanecimiento
    setTimeout(() => {
      navigate("/home");
    }, 4000); // Espera 1 segundo antes de redirigir
  }


/*   useEffect(() => {
    if (fade) {
      const body = document.querySelector("body");
      body.classList.add("fadeOut"); // Agrega la clase fadeOut al elemento body
    }
    return () => {
      const body = document.querySelector("body");
      body.classList.remove("fadeOut"); // Elimina la clase fadeOut al desmontar el componente
    };
  }, [fade]); */

  return (
    <div className={s.divLP}>
      {fade && <div className={s.fadeOut}></div>}
      <div className={s.divTextBtn}>
        {/* <h1 className={s.text}>WELCOME <br/>
                VIDEOGAMES APP
                
            </h1> */}


        <button className={s.btn} onClick={handlerSubmit}>
        <img className={s.img} src={WELCOME} alt="WELCOME"/>
        </button>
      </div>

      {/* <img className={s.img} src="https://i.pinimg.com/originals/ac/8f/61/ac8f610d390a504026b5e7bd2b67818f.gif" alt="Img not found"/> */}

    </div>
  );
}