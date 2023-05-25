import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import s from "./Filters.module.css"

export default function Filters({ handlerGenres, handlerCreated, source, genrechange }) {

  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  return (
    <div className={s.divSourceGenres}>

      <div className={s.divSourceGenres}>

        <div className={s.divSource2}>
          <button style={source === "All" ? { backgroundColor: "#981515", color: "white", borderColor: "white" } : undefined} className={s.source} onClick={() => handlerCreated('All')} >ALL</button>

          <button style={source === "DB" ? { backgroundColor: "#981515", color: "white", borderColor: "white" } : undefined} className={s.source} onClick={() => handlerCreated('DB')}>DB</button>

          <button style={source === "Api" ? { backgroundColor: "#981515", color: "white", borderColor: "white" } : undefined} className={s.source} onClick={() => handlerCreated('Api')}>API</button>
        </div>
      </div>

      <div>

        <select value={genrechange} onChange={(e) => handlerGenres(e)} className={s.select}>
          <option value=''>GENRES</option>
          <option value='All'>All</option>
          {
            genres && genres.map(g => (
              <option value={g.name} key={g.id}>{g.name}</option>
            ))
          }
        </select>
      </div>


    </div>
  )
}