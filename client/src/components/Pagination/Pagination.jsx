import React from "react";
import s from "./Pagination.module.css"


export default function Pagination ({videogamesPerPage, allVideogames, pagination, currentPage}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <nav>
            <ul className={s.button}>
                {pageNumbers && pageNumbers.map(number => (
                    <div key={number}>
                        <button onClick={() => pagination(number)} className={s.eachBtn} style={currentPage === number ? {backgroundColor: "#981515", color: "white", borderColor:"white" , fontSize: "20px"} : undefined}>{number}</button>
                    </div>
                   
                ))}
            </ul>
        </nav>
    )
}

/* import React from "react";
import styles from "./Pagination.module.css";

export default class Paginated extends React.Component {
  handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    const { videogamesPerPage, allVideogames, paginado } = this.props;
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
      pageNumbers.push(i + 1);
    }

    return (
      <div>
        <ul className={styles.videogamesList}>
        </ul>
        <nav className={styles.container}>
          <ul className={styles.pageNumbers}>
            {pageNumbers?.map((number) => (
              <li
                className={
                  number === this.props.currentPage
                    ? `${styles.pageNumber} ${styles.activePage}`
                    : styles.pageNumber
                }
                key={number}
              >
                <button onClick={() => paginado(number)}>{number}</button>
              </li>
            ))}
          </ul>
          <button className={styles.scrollButton} onClick={this.handleScrollToTop}>
            &#9650;
          </button>
        </nav>
        <button className={styles.scrollButtonMobile} onClick={this.handleScrollToTop}>
          &#9650;
        </button>
      </div>
    );
  }
} */
//! codigo funcional abajo:
/* import React from "react";
import styles from "./Paginated.module.css";

export default class Paginated extends React.Component {
  render() {
    const { videogamesPerPage, allVideogames, paginado } = this.props;
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
      pageNumbers.push(i + 1);
    }

    //Este componente va a renderizar los numeritos en si
    return (
      <nav className={styles.container}>
        <ul className={styles.ul}>
          {pageNumbers?.map((number) => (
            <li className={styles.paginado} key={number}>
              <button
                className={styles.botonPaginado}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
} */


/* import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/actions";


export default function Paginated(props) {
    const dispatch = useDispatch();
    const { totalItems, itemsPorPagina } = props;
    const { page: pagina } = useSelector((state) => state);

    const cantPaginas = Math.ceil(totalItems / itemsPorPagina) - 1;

    const pageNumbers = [];

    function handleChangePage(page) {
        dispatch(changePage(page));
    }

    for (let i = 0; i <= cantPaginas; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {
                <>
                    <button
                        disabled={pagina === 0}
                        key={"first"}
                        onClick={() => handleChangePage(0)}
                    >
                        {"<<"}
                    </button>
                    <button
                        disabled={pagina === 0}
                        
                        key={"prev"}
                        onClick={() => handleChangePage(pagina - 1)}
                    >
                        {"<"}
                    </button>
                </>
            }
            {pageNumbers.length > 0 &&
                pageNumbers.map((p, i) => {
                    return (
                        <button
                            disabled={i === pagina}
                            
                            key={i}
                            onClick={() => handleChangePage(p)}
                        >
                            {p + 1}
                        </button>
                    );
                })}
            {
                <>
                    <button
                        disabled={pagina === cantPaginas}
                        
                        key={"next"}
                        onClick={() => handleChangePage(pagina + 1)}
                    >
                        {">"}
                    </button>
                    <button
                        disabled={pagina === cantPaginas}
                        
                        key={"last"}
                        onClick={() => handleChangePage(cantPaginas)}
                    >
                        {">>"}
                    </button>
                </>
            }
        </div>
    );
}
 */