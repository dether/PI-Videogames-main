import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterByGenres, filterByCreated,
  orderByName, orderByRating
} from '../../redux/actions';
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Filters from '../Filters/Filters';
import OrderBy from '../OrderBy/OrderBy';
import Nav from '../Nav/Nav';
import Pagination from "../Pagination/Pagination";
import s from "./HomePage.module.css"

export default function HomePage() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);


  //Defino estados locales
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage /*setVideogamesPerPage*/] = useState(15);
  const [reset, setReset] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [filters, setFilters] = useState({});
  const [fade, setFade] = useState(true);

  const indexOfLastVideogame = currentPage * videogamesPerPage; // 15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
  //Videojuegos que estan en la pagina actual
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const [source, setSource] = useState("All");
  const [namechange, setNamechange] = useState('');
  const [ratingchange, setRatingchange] = useState('');
  const [genrechange, setGenrechange] = useState('');
  const [, setOrder] = useState()
  
  useEffect(() => {
    setTimeout(() => {
      setFade(false); // Desactiva la animación de desvanecimiento después de 5 segundos
    }, 5000);
  }, []); 

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);


  function handleClick(e) {
    e.preventDefault();
    setReset(true);
    setNamechange("");
    setRatingchange("");
    setGenrechange("");
    setCurrentPage(1);
    setSource("All");
  }

  function handlerGenres(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
    setSource("All");
    setGenrechange(e.target.value);
    setOrder("Order" + e.target.value)
  }

  function handlerCreated(e) {
    dispatch(filterByCreated(e));
    console.log(e);
    setSource(e);
    setCurrentPage(1);
    setGenrechange("");
    setOrder("Order" + e)
  }

  function handlerByName(e) { //no puedo pasar un estado local a otro componente?
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setRatingchange("");
    setNamechange(e.target.value);
    setOrder("Order" + e.target.value)
  }

  function handlerByRating(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setNamechange("");
    setRatingchange(e.target.value);
    setOrder("Order" + e.target.value);
  }

  return (
    <div>
      {fade && <div className={s.fadeIn}></div>} {/* Agrega la clase fadeIn cuando fade es verdadero */}
      {/* Resto del código... */} 
      <Nav
        handlerGenres={handlerGenres}
        handlerCreated={handlerCreated}
        handlerByName={handlerByName}
        handlerByRating={handlerByRating}
      />
      <p class={s.title}>Filters</p>
      <div className={s.cardsAndFilters}>

        <div className={s.holi}>
          <button onClick={e => { handleClick(e) }} className={s.btn}>
            RESET
          </button>
          <OrderBy handlerByName={handlerByName} handlerByRating={handlerByRating} namechange={namechange} ratingchange={ratingchange} />
          <Filters handlerGenres={handlerGenres} handlerCreated={handlerCreated} source={source} genrechange={genrechange} />
        </div>

        <div className={s.containerCards}>

          <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage} />

          <div className={s.home}>

            { currentVideogames.length > 0 ?
              <div className={s.containerCards}>
                {currentVideogames.map(el => {
                  return (
                    <div key={el.id}>
                      <Card name={el.name} genres={el.genres} image={el.image ? el.image : "imgDefault"} rating={el.rating} id={el.id} createdInDb={el.createdInDb} />
                    </div>
                  );
                })}
              </div>
              :
              <div className={s.divLoading}>
                <img
                  className={s.loading}
                  src="https://i.pinimg.com/originals/db/f2/55/dbf255f9f7ba73f466e9129fc698d779.gif"
                  alt="Loading..."
                />
                <h1 className={s.title}>Loading...</h1>

              </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

