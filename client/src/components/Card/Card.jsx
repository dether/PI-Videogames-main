import React from "react";
import s from "./Card.module.css"
import { deleteVideogame } from "../../redux/actions";
import { getVideogames } from "../../redux/actions";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Card({ name, genres, image, rating, id }) {


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