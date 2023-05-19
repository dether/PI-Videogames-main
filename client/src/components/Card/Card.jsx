import React from "react";
import s from "./Card.module.css"
import { deleteVideogame } from "../../redux/actions";
import { getVideogames } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Card({ name, genres, image, rating, id, createdInDb }) {
  let dispatch = useDispatch();

  function handleClickDelete(id) {
    const result = window.confirm('Are you sure? You won\'t be able to revert this.');

    if (result) {
      alert('Deleted! Your videogame has been deleted.');
      dispatch(deleteVideogame(id));
      dispatch(getVideogames());
    } else {
      alert('Cancelled. Your videogame is safe :)');
    }
  }
  return (
    <div className={s.cards_item}>
      <div className={s.card}>

        <Link to={`/videogame/${id}`}>
          <h3 className={s.name}>{name}</h3>
          <img className={s.imgs} src={image} alt="img not found" />
        </Link>


        <div className={s.afterImg}>
          <p className={s.text}>{Array.isArray(genres) && genres.join(", ")}</p>
          <p className={s.rating} style={
            rating < 1
              ? { backgroundColor: "rgb(255, 77, 91)" }
              : rating < 4
                ? { backgroundColor: "rgb(253, 158, 81)" }
                : { backgroundColor: "rgb(4, 201, 4)" }
          }>
            ⭐{rating}
          </p>
        </div>

        <div>
          {
            createdInDb === true ?
              <button className={s.btnDelete} onClick={() => handleClickDelete(id)}>X</button>
              : undefined
          }
        </div>

      </div>
    </div>
  )
}

//* ***********************************************************


/* import React from "react"

export default function Cards ({ videogame }) {
  return (
    <div>
      <img src={videogame.image} alt={videogame.name} />
      <h2>{videogame.name}</h2>
      <p>{videogame.genres.join(", ")}</p>
    </div>
  );
}; */