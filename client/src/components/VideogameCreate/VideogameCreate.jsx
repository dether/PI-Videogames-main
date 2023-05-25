import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postVideogames, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./VideogameCreate.module.css";
import Nav from "../Nav/Nav"

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const [fade, setFade] = useState(false);

  const platformsApi = [
    "PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
    "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"]

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    image: "",
    genres: []
  });

  function handlerChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handlerSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : [...input.platforms, e.target.value],
    });
  }

  function handlerDeletePlatforms(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e),
    });
  }

  function handlerSelectGenres(e) {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value)
        ? input.genres
        : [...input.genres, e.target.value],
    });
  }

  function handlerDeleteGenres(e) {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e),
    });
  }


  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(postVideogames(input));
    alert('You created videogame.');

    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      image: "",
      genres: []
    })

    setFade(true); // Activa la animación de desvanecimiento

    setTimeout(() => {
      navigate("/home");
    }, 3500); // Espera 5 segundos antes de redirigir

  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);





  return (
    <div>
    <Nav/>
    <div className={s.divGeneral}>
{fade && <div className={s.fadeOut}></div>} {/* Agrega la clase fadeOut cuando fade es verdadero */}
      <div className={s.divCreate}>

        <h1 className={s.title}>New Game</h1>

        <form onSubmit={(e) => { handlerSubmit(e) }}>
          <div className={s.data}>
            <div className={s.firstColumn}>

              <div>
                <label>Name: <br></br></label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(e) => handlerChange(e)}
                  required={true}
                  placeholder="Videogame"
                  className={s.input}
                />
              </div>

              <br></br>

              <div>
                <label>Description: <br></br></label>
                <textarea
                  type="text"
                  value={input.description}
                  name="description"
                  onChange={(e) => handlerChange(e)}
                  required={true}
                  placeholder="Enter a description"
                  className={s.inputDescription}
                />
              </div>

              <br></br>

              <div>
                <label>Image: <br></br></label>
                <input
                  type="text"
                  value={input.image}
                  name="image"
                  onChange={(e) => handlerChange(e)}
                  placeholder="Img URL"
                  className={s.input}
                />
              </div>

            </div>


            <div className={s.secondColumn}>

              <div>
                <label>📆 Release Date: <br></br></label>
                <input
                  type="date"
                  value={input.released}
                  name="released"
                  onChange={(e) => handlerChange(e)}
                  className={s.input}
                  required={true}
                />
              </div>

              <br></br>

              <div>
                <label>Platforms: <br></br></label>
                <select className={s.input} required={true} onChange={(e) => { handlerSelectPlatforms(e) }}>
                  <option value="">Choose 1 or more</option>
                  {
                    platformsApi && platformsApi.map((p, index) => (
                      <option key={index} value={p}>{p}</option>
                    ))
                  }
                </select>
                {
                  input.platforms.map((el, index) =>
                    <div key={index} className={s.divMultiSelect}>
                      <p className={s.multiSelect}>{el}</p>
                      <button className={s.btnMultiSelect} onClick={() => { handlerDeletePlatforms(el) }}>X</button>
                    </div>
                  )
                }
              </div>

            </div>


            <div>
              <div>
                <label>⭐Rating: <br></br></label>
                <input
                  type="number"
                  value={input.rating}
                  name="rating"
                  onChange={(e) => handlerChange(e)}
                  className={s.input}
                  id={s.inputRating}
                  step={0.01}
                  placeholder="0.00 - 5.00"
                  min={0.00}
                  max={5}
                  required={true}
                />
              </div>

              <br></br>

              <div>
                <label>🎭 Genres: <br></br></label>
                <select className={s.selectGenres} onChange={(e) => { handlerSelectGenres(e) }}>
                  <option value="">Choose 1 or more</option>
                  {
                    genres && genres.map(g => (
                      <option key={g.id} value={g.name}>{g.name}</option>
                    ))
                  }
                </select>

                {
                  input.genres.map((el, index) =>
                    <div key={index} className={s.divMultiSelect}>
                      <p className={s.multiSelect}>{el}</p>
                      <button className={s.btnMultiSelect} onClick={() => { handlerDeleteGenres(el) }}>X</button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>

          <button className={s.btn} type="submit">Create Videogame</button>

        </form>

      </div>
    </div>
    </div>
  )
}