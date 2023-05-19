const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_VIDEOGAMES':
        return {
            ...state,
            videogames: action.payload,
            allVideogames: action.payload 
        }

    case 'GET_GENRES':
        return {
            ...state,
            genres: action.payload
        }
        
    case 'FILTER_BY_GENRES':
        const allVideogames = state.allVideogames;
        const filteredGenre = action.payload === 'All'? allVideogames : allVideogames.filter(v => v.genres?.find(v => v === action.payload));
        return {
            ...state,
            videogames: filteredGenre
        }
    
    case 'FILTER_CREATED':
        const allVideogames2 = state.allVideogames;
        const filteredCreation = action.payload === 'Created' ? allVideogames2.filter(el => el.createdInDb) : allVideogames2.filter(el => !el.createdInDb);

        return {
            ...state,
            videogames: action.payload === 'All' ? allVideogames2 : filteredCreation
        }
    
    
    case 'ORDER_BY_NAME':
        let orderAsc = state.videogames.slice().sort((a, b) => {
            let videogameA = a.name.toLowerCase();
            let videogameB = b.name.toLowerCase();

            if(videogameA > videogameB) return 1;

            if(videogameB > videogameA) return -1;

            return 0;
        })

        const allVideogames3 = state.allVideogames;
        const orderName = action.payload === 'asc' ? orderAsc : orderAsc.reverse();

        return {
            ...state,
            videogames: action.payload === '' ? allVideogames3 : orderName
        }

    case 'ORDER_BY_RATING':
        let orderRatingAsc = state.videogames.slice().sort((a, b) => {

            if(Number(a.rating) > Number(b.rating)) return 1;

            if(Number(b.rating) > Number(a.rating)) return -1;

            return 0;
        })

        return {
            ...state,
            videogames: action.payload === 'asc' ? orderRatingAsc : orderRatingAsc.reverse()
        }

    case 'GET_NAME_VIDEOGAMES':
        return {
            ...state,
            videogames: action.payload
        }

    case 'GET_ID_VIDEOGAME':
        return {
            ...state,
            detail: action.payload
        }


    default:
        return state;
}

}

export default reducer;


/* import {
  FETCH_VIDEOGAMES_SUCCESS,
  FETCH_VIDEOGAMES_ERROR,
  GET_DETAIL_VIDEOGAME,
  EMPTY_DETAIL_VIDEOGAME,
  SEARCH_VIDEOGAMES,
  GET_GENRES,
  ORDER_VIDEOGAMES,
  FILTER_VIDEOGAMES,
  EMPTY_FILTERED_VIDEOGAMES,
  CREATE_VIDEOGAME,
  ORIGEN_FILTER_VIDEOGAMES,
  FILTER_PLATFORM,
} from "./actions-types";

const initialState = {
  allVideogames: [],
  filteredVideogames: [],
  detailVideoGame: {},
  allGenres: [],
  searchedGames: [],
  orderState: "",
  filterState: "",
  origenState: "",
  platformState: "",

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        filteredVideogames: action.payload,
        allVideogames: action.payload,
      };

    case FETCH_VIDEOGAMES_ERROR:
      return { ...state, error: action.error };

    case GET_DETAIL_VIDEOGAME:
      return { ...state, detailVideoGame: action.payload };

    case EMPTY_DETAIL_VIDEOGAME:
      return {
        ...state,
        detailVideoGame: {},
      };

    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        searchedGames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };

      case ORDER_VIDEOGAMES:
        switch (action.payload) {
          case "string":
            return {
              ...state,
              filteredVideogames: state.filteredVideogames,
              orderState: action.payload,
            };
      
          case "abc-asc":
            return {
              ...state,
              filteredVideogames: [...state.filteredVideogames].sort((a, b) =>
                a.name && b.name ? a.name.localeCompare(b.name) : 0
              ),
              orderState: action.payload,
            };
      
          case "abc-desc":
            return {
              ...state,
              filteredVideogames: [...state.filteredVideogames].sort((a, b) =>
                b.name && a.name ? b.name.localeCompare(a.name) : 0
              ),
              orderState: action.payload,
            };
      
          case "rating-desc":
            return {
              ...state,
              filteredVideogames: [...state.filteredVideogames].sort(
                (a, b) => (a.rating && b.rating ? a.rating - b.rating : 0)
              ),
              orderState: action.payload,
            };
          case "rating-asc":
            return {
              ...state,
              filteredVideogames: [...state.filteredVideogames].sort(
                (a, b) => (b.rating && a.rating ? b.rating - a.rating : 0)
              ),
              orderState: action.payload,
            };
        }

    case FILTER_VIDEOGAMES:
      const filtered2 =
        typeof state.filteredVideogames !== "string"
          ? state.filteredVideogames.filter((game) =>
              game.genres.includes(action.payload)
            )
          : [];
      return {
        ...state,
        filteredVideogames: filtered2.length > 0 ? filtered2 : "No games",
        filterState: action.payload,
      };

    case FILTER_PLATFORM:
      const filtered =
        typeof state.filteredVideogames !== "string"
          ? state.filteredVideogames.filter((game) => {
              if (typeof game.platforms === "string") {
                return game.platforms.toLowerCase().includes(action.payload);
              }
              return false;
            })
          : [];
      return {
        ...state,
        filteredVideogames: filtered.length > 0 ? filtered : "No games",
        platformState: action.payload,
      };

    case EMPTY_FILTERED_VIDEOGAMES:
      return {
        ...state,
        filteredVideogames: [],
        filterState: "",
        orderState: "",
        origenState: "",
        platformState: "",
      };

    case CREATE_VIDEOGAME:
      return {
        ...state,
        filteredVideogames: [...state.filteredVideogames, action.payload],
        allVideogames: [...state.allVideogames, action.payload],
      };

    case ORIGEN_FILTER_VIDEOGAMES:
      switch (action.payload) {
        case "api":
          const filtered1 = state.allVideogames.filter(
            (game) => typeof game.id === "number"
          );
          return {
            ...state,
            filteredVideogames: filtered1.length > 0 ? filtered1 : "No games",
            origenState: action.payload,
          };
        case "db":
          const filtered3 = state.allVideogames.filter(
            (game) => typeof game.id === "string"
          );
          return {
            ...state,
            filteredVideogames: filtered3.length > 0 ? filtered3 : "No games",
            origenState: action.payload,
          };
        default:
          return {
            ...state,
            filteredVideogames: state.allVideogames,
            origenState: action.payload,
          };
      }
    
    
    default:
      return state;
  }
};

export default reducer;
 */