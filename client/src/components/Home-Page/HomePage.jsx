import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterByGenres, filterByCreated,
  orderByName, orderByRating
} from '../../redux/actions';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';
import OrderBy from '../OrderBy/OrderBy';
import Nav from '../Nav/Nav';
import Pagination from "../Pagination/Pagination";
import s from "./HomePage.module.css"
import Loading from '../Loading/Loading';

export default function HomePage() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);


  //Defino estados locales
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [reset, setReset] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [filters, setFilters] = useState({});
  const [fade, setFade] = useState(true);

  // Para controlar si el botón de reset está habilitado o no
  const [isResetDisabled, setIsResetDisabled] = useState(true);

  const indexOfLastVideogame = currentPage * videogamesPerPage; // 15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0

  // Games que estan en la pagina actual
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
console.log(currentVideogames);

  const [source, setSource] = useState("All");
  const [namechange, setNamechange] = useState('');
  const [ratingchange, setRatingchange] = useState('');
  const [genrechange, setGenrechange] = useState('');
  const [, setOrder] = useState()

  useEffect(() => {
    setTimeout(() => {
      setFade(false); // Desactiva la animación de desvanecimiento después de x segundos
    }, 2500);
  }, []);
  
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

// reset
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
    setReset(true);
    setNamechange("");
    setRatingchange("");
    setGenrechange("");
    setCurrentPage(1);
    setSource("All");
    setIsResetDisabled(true); // Deshabilita el botón de reset nuevamente
  }

  function handlerGenres(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
    setSource("All");
    setGenrechange(e.target.value);
    setOrder("Order" + e.target.value)
    setIsResetDisabled(false);
  }

  function handlerCreated(e) {
    dispatch(filterByCreated(e));
    console.log(e);
    setSource(e);
    setCurrentPage(1);
    setGenrechange("");
    setOrder("Order" + e)
    setIsResetDisabled(false);
  }

  function handlerByName(e) { //no puedo pasar un estado local a otro componente?
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setRatingchange("");
    setNamechange(e.target.value);
    setOrder("Order" + e.target.value)
    setIsResetDisabled(false);
  }

  function handlerByRating(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setNamechange("");
    setRatingchange(e.target.value);
    setOrder("Order" + e.target.value);
    setIsResetDisabled(false);
  }

  return (
    <div>
      <Loading />

      {fade && <div className={s.fadeIn}></div>} {/* Agrega la clase fadeIn cuando fade es verdadero */}
      <Nav/>
      <p className={s.title}>THE GAMER DOES NOT DIE. RESPAWNEA</p>
      <div className={s.cardsAndFilters}>
        <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage} />

        <div className={s.holi}>
          <button onClick={e => { handleClick(e) }} disabled={isResetDisabled} className={`${s.btn} ${isResetDisabled && s.disabled}`}>
            RESET
          </button>
          <OrderBy handlerByName={handlerByName} handlerByRating={handlerByRating} namechange={namechange} ratingchange={ratingchange} />
          <Filters handlerGenres={handlerGenres} handlerCreated={handlerCreated} source={source} genrechange={genrechange} />
        </div>

        <div className={s.containerCards}>

          <div className={s.home}>


            {currentVideogames.length > 0 ?
              <div className={s.containerCards}>
                {currentVideogames.map(el => {
                  return (
                    <div key={el.id}>
                      <Card name={el.name} genres={el.genres} image={el.image ? el.image : "img not found"} rating={el.rating} id={el.id} />
                    </div>
                  );
                })}
              </div>
              :
              <Loading />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

