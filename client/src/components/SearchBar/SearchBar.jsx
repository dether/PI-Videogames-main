import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from "../../redux/actions";
import s from "./SearchBar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handlerChange(e) {
    e.preventDefault();
    setName(e.target.value);
    /* console.log(name); */
}

function handlerSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(name));
    setName("");
}

return (
  <div className={s.searchForm}>
      <form onSubmit={(e) => handlerSubmit(e)}>
          <input
          type="text"
          placeholder="Search a videogame..."
          value={name}
          onChange={(e) => handlerChange(e)}
          className={s.searchInput}
          />

          <button type="submit" className={s.searchButton}>Search</button>
      </form>
      
  </div>
)
}
/* import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchBar () {
const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Debe ingresar un nombre");
    } else {
      dispatch(getNameVideogames(name));
      setName("");
      document.getElementById("search").value = "";
    }
  }

  return (
    <div className="searchBar">
      <input
        className="inputS"
        id="search"
        type="text"
        placeholder="Search game"
        onChange={(e) => handleInputChange(e)}
      />
      <button className="botonS" type="submit" onClick={(e) => handleSubmit(e)}>
        BUSCAR🔎
      </button>
    </div>
  );
} */