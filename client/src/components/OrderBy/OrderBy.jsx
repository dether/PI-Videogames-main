import React from "react";
import s from "./OrderBy.module.css"

export default function OrderBy({handlerByName, handlerByRating, namechange, ratingchange}) {

    return (
        <div className={s.divContainer}>


            <div className={s.divName}>
                <select value={namechange} onChange={(e) => handlerByName(e)} className={s.select}>
                    <option value=''>Order by Name</option>
                    <option value='asc'>(A - Z)</option>
                    <option value='desc'>(Z - A)</option>
                </select>
            </div>

            <div className={s.divRating}>
                <label className={s.subTitles}></label>
                <select value={ratingchange} onChange={(e) => handlerByRating(e)} className={s.select}>
                    <option value=''>Order by Rating</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </div>
        </div>
    )

}

