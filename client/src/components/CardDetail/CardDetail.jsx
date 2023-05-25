import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogameById, clearVideogame } from "../../redux/actions";
import s from "./CardDetail.module.css"
import Loading from "../Loading/Loading";


export default function CardDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailVideogame = useSelector(state => state.detail);

  useEffect(() => {
    dispatch(clearVideogame());
    dispatch(getVideogameById(id));
  }, [dispatch, id]);

  return (
    <div>
        { 
            detailVideogame.name?
            <div className={s.divGeneral}>

                <div className={s.div}>

                    <h1 className={s.title}>{detailVideogame.name}</h1> <hr className={s.hr}></hr>

                    <div className={s.divAllInfo}>
                        <div className={s.divImg}>
                            <img className={s.img} src={detailVideogame.image? detailVideogame.image : "not found" } alt="Img not found"/>
                        </div>
                        <div className={s.info}>
                            <p>{detailVideogame.description}</p>
                            <p>
                            📆 Release Date: <span>{detailVideogame.released}</span> 
                            </p>
                            <p>
                                ⭐Rating: <span>{parseFloat(detailVideogame.rating)}</span>
                            </p>
                            <p>
                                🎮 Platforms: <span>{Array.isArray(detailVideogame.platforms) ? detailVideogame.platforms.join(", ") : detailVideogame.platforms}</span>
                            </p>
                            <p>
                                🎭 Genres: <span>{Array.isArray(detailVideogame.genres) ? detailVideogame.genres.join(", ") : detailVideogame.genres}</span>
                            </p>
                <div className={s.divBack}> 
                    <Link to = "/home">
                        <button className={s.btn}>BACK</button>
                    </Link>
                </div>
                        </div>
                    </div>

                </div>


            </div> 
            :  
            <Loading/>
        }
    </div>
)
}