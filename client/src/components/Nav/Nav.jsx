import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar'
import s from './Nav.module.css';
import { Link } from 'react-router-dom';

export default function Nav({
  handlerGenres,
  handlerCreated,
  handlerByName,
  handlerByRating,
  source,
  genrechange,
}) {

  const [navReset, setNavReset] = useState(false);
  const [navOrderBy, setNavOrderBy] = useState("");
  const [navFilters, setNavFilters] = useState({});

  useEffect(() => {
    if (navReset) {
      setNavReset(false);
    }
  }, [navReset]);

  useEffect(() => {
    if (source === "All") {
      setNavFilters({});
    }
  }, [source]);

  useEffect(() => {
    if (genrechange) {
      setNavFilters((prevFilters) => ({
        ...prevFilters,
        genre: genrechange,
      }));
    }
  }, [genrechange]);

  return (
    <nav className={s.nav}>
      <div className={s.left}>
        <Link to="/" className={s.navLink}>
          HOME
          {/* <img className={s.img} src="https://fontmeme.com/temporary/217d514ec9bb0d3cd1514cd3bcbbe938.png"/> */}
        </Link>
        <Link to="/videogames" className={s.navLink}>
          CREATE
        </Link>
      </div>
      <div className={s.center}>
        <SearchBar/>
      </div>
      <div className={s.right}> 
        <Link to="/about" className={s.navLink}>
          ABOUT
        </Link>
        <Link to="/" className={s.navLink}>
          EXIT
        </Link>
      </div>
    </nav>
  );
}

/* import style from "./Nav.module.css" */
/* import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { origenFilterVideogames, orderVideogames, filterPlatform, filterVideogames } from "../../redux/actions";

export default function NavBar() { */
/* const dispatch = useDispatch();
const { allGenres, filterState, origenState, orderState, platformState } = useSelector((state) => state); 
 
const [orderBy, setOrderBy] = useState(orderState);
const [filterBy, setFilterBy] = useState(filterState);
const [origenBy, setOrigenBy] = useState(origenState);
const [platformBy, setPlatformBy] = useState(platformState);

const setSelects = (order = "", filter = "", origen = "", platform = "") => {
    setOrderBy(order);
    setFilterBy(filter);
    setPlatformBy(platform);
    setOrigenBy(origen);
    dispatch(origenFilterVideogames(origen));
    dispatch(filterPlatform(platform));
    dispatch(filterVideogames(filter));
    dispatch(orderVideogames(order));
}
 
const handleChangeOrder = (event) => {
    setSelects(event.target.value, filterBy, origenBy, platformBy);
}

const handleChangeFilter = (event) => {
    setSelects(orderBy, event.target.value, origenBy, platformBy);
}

const handleChangeOrigen = (event) => {
    setSelects(orderBy, filterBy, event.target.value, platformBy);
}

const handleChangePlataform = (event) => {
    setSelects(orderBy, filterBy, origenBy, event.target.value);
}

const handleCleanFilters = () => {
    setSelects(); 
};*/

/* return (
    <div>
        <Link to="/home">
        <p data-text="VideoGames">
            VideoGames
        </p>
        </Link>
        <Link to="/newgame">
            New Game
        </Link> */
{/* <select
                value={orderBy}
                name="order"
                id="order-select"
                onChange={handleChangeOrder}
            >
                <option value="">-- Order --</option>
                <option value="abc-asc">A-Z</option>
                <option value="abc-desc">Z-A</option>
                <option value="rating-asc">Rating +</option>
                <option value="rating-desc">Rating -</option>
            </select>

            <select
                value={platformBy}
                name="plataformas"
                id="plataformas-select"
                onChange={handleChangePlataform}
            >
                <option value="">-- Platform --</option>
                <option value="android">Android</option>
                <option value="apple macintosh">Apple Macintosh</option>
                <option value="linux">Linux</option>
                <option value="nintendo">Nintendo</option>
                <option value="pc">PC</option>
                <option value="playstation">PlayStation</option>
                <option value="xbox">Xbox</option>
            </select>

            <select
                value={filterBy}
                name="genre"
                id="genre-select"
                onChange={handleChangeFilter}
            >
                <option value="">-- Genre --</option>
                {allGenres &&
                    allGenres.map((g) => (
                        <option key={g.name} value={g.name}>
                            {g.name}
                        </option>
                    ))}
            </select>

            <select
                name="origen"
                id="origen-select"
                value={origenBy}
                onChange={handleChangeOrigen}
            >
                <option value="">-- Source --</option>
                <option value="api">API WEB</option>
                <option value="db">DB</option>
            </select>

            <button onClick={handleCleanFilters} >
                Clean Filters
            </button>
 */}
{/* <button>
                <SearchBar />
            </button>
        </div>
    )
} */}
