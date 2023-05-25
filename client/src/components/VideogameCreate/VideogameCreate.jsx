import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postVideogames, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./VideogameCreate.module.css";
import Nav from "../Nav/Nav"
import Validate from "../Validate/Validate";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const [fade, setFade] = useState(false);
  
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

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

  const [errors, setErrors] = useState({});

  const handlerChange= (event) => {
		const inputName = event.target.name;
    const inputReleased = event.target.released; 
    const inputDescription = event.target.description;
    const inputRating = event.target.rating;

		const inputValue = event.target.value;


		setInput({
			...input,
			[inputName]: inputValue,
      [inputReleased]: inputValue,
      [inputDescription]: inputValue,
      [inputRating]: inputValue,
		});

		setErrors(
			Validate({
				...input,
				[inputName]: inputValue,
        [inputReleased]: inputValue,
        [inputDescription]: inputValue,
        [inputRating]: inputValue,
			})
		);
	};



  const handlerSelectPlatforms = (event) => {
    setInput({
      ...input,
      platforms: input.platforms.includes(event.target.value)
        ? input.platforms
        : [...input.platforms, event.target.value],
    });
  }

  const handlerDeletePlatforms = (event) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== event),
    });
  }

  const handlerSelectGenres = (event) => {
    setInput({
      ...input,
      genres: input.genres.includes(event.target.value)
        ? input.genres
        : [...input.genres, event.target.value],
    });
  }

  const handlerDeleteGenres = (event) => {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== event),
    });
  }


  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(postVideogames(input));
    
    // Si no tengo errores
    if(errors.isValid){
      // reiniciamos los campos
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: []
      })
      alert('You created videogame.');

      setFade(true); // Activa la animación de desvanecimiento
  
      setTimeout(() => {
        navigate("/home");
      }, 3500); // Espera x segundos antes de redirigir

      //reinicio el estado del boton
      setErrors({ isValid: false });
    }else {
      alert("incomplete data")
    }
  };

  return (
    <div>
    <Nav/>
    <div className={s.divGeneral}>
{fade && <div className={s.fadeOut}></div>} 
      <div className={s.divCreate}>

        <h1 className={s.title}>New Game</h1>

        <form onSubmit={(event) => { handlerSubmit(event) }}>
          <div className={s.data}>
            <div className={s.firstColumn}>

              <div>
                <label>📛 Name: <br></br></label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(event) => handlerChange(event)}
                  required={true}
                  placeholder="Videogame"
                  className={s.input}
                />
                <p>{errors.name}</p>
              </div>

              <br></br>

              <div>
                <label>📒 Description: <br></br></label>
                <textarea
                  type="text"
                  value={input.description}
                  name="description"
                  onChange={(event) => handlerChange(event)}
                  maxLength="1200"
                  placeholder="Typing a description for your game"
                  className={s.inputDescription}
                />
                <p>{errors.description}</p>
              </div>

              <br></br>

              <div>
                <label>🖼️ Image: <br></br></label>
                <input
                  type="text"
                  value={input.image}
                  name="image"
                  onChange={(event) => handlerChange(event)}
                  placeholder="Image URL"
                  className={s.input}
                />
                <p>{errors.image}</p>
              </div>

            </div>


            <div className={s.secondColumn}>

              <div>
                <label>📆 Release Date: <br></br></label>
                <input
                  type="date"
                  value={input.released}
                  name="released"
                  onChange={(event) => handlerChange(event)}
                  className={s.input}
                  required={true}
                />
                <p>{errors.released}</p>
              </div>

              <br></br>

              <div>
                <label>🎮 Platforms: <br></br></label>
                <select className={s.input} required={true} onChange={(event) => { handlerSelectPlatforms(event) }}>
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
                  onChange={(event) => handlerChange(event)}
                  className={s.input}
                  id={s.inputRating}
                  step={0.01}
                  placeholder="0.00 - 5.00"
                  min={0.00}
                  max={5.00}
                  required={true}
                />
                <p>{errors.rating}</p>
              </div>

              <br></br>

              <div>
                <label>🎭 Genres: <br></br></label>
                <select className={s.selectGenres} required={true} onChange={(event) => { handlerSelectGenres(event) }}>
                  <option value="">Choose 1 or more</option>
                  {
                    genres && genres.map(g => (
                      <option key={g.id} value={g.name}>{g.name}</option>
                    ))
                  }
                </select>
                <p>{errors.genres}</p>

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

          <button className={s.btn} type="submit" disabled={!errors.isValid}>Create Videogame</button>

        </form>

      </div>
    </div>
    </div>
  )
}