import axios from "axios";
const baseURL = "http://localhost:3001";

export function getVideogames() {
    return function(dispatch) {
        axios.get(`${baseURL}/videogames`)
            .then(response => {
                return dispatch({
                    type: 'GET_VIDEOGAMES',
                    payload: response.data
                })
            })
    }
}


export function getVideogamesByName(payload) {
    return function(dispatch) {
        axios.get(`${baseURL}/videogames?name=${payload}`)
            .then(response => {
                return dispatch({
                    type: 'GET_NAME_VIDEOGAMES',
                    payload: response.data
                })
            })
    }
}


export function getVideogameById(payload) {
    return function(dispatch) {
        axios.get(`${baseURL}/videogame/${payload}`)
            .then(response => {
                return dispatch({
                    type: 'GET_ID_VIDEOGAME',
                    payload: response.data
                })
            })
    }
}


export function clearVideogame() {
    return function(dispatch) {
        return dispatch({
            type: 'GET_ID_VIDEOGAME',
            payload: []
        })
    }
}


export function postVideogames(payload) {
    return function() {
        axios.post(`${baseURL}/videogames`, payload)
            .then(response => {
                return response
            })
    }
}


export const deleteVideogame = (id) => {
    return function() {
        axios.delete(`${baseURL}/videogames/${id}`)
            .then(response => {
                return response
            })
    }  
}

export function getGenres() {
    return function(dispatch) {
        axios.get(`${baseURL}/genres`)
            .then(response => {
                return dispatch({
                    type: 'GET_GENRES',
                    payload: response.data
                })
            })
    }
}


export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}


export function filterByCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}


export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}


export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}



/* import axios from "axios";
import {
  FETCH_VIDEOGAMES_SUCCESS,
  FETCH_VIDEOGAMES_ERROR,
  GET_DETAIL_VIDEOGAME,
  EMPTY_DETAIL_VIDEOGAME,
  SEARCH_VIDEOGAMES,
  GET_GENRES,
  ORDER_VIDEOGAMES,
  FILTER_VIDEOGAMES,
  CREATE_VIDEOGAME,
  ORIGEN_FILTER_VIDEOGAMES,
  FILTER_PLATFORM,
  EMPTY_FILTERED_VIDEOGAMES,

} from "./actions-types";

const baseURL = "http://localhost:3001";


export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseURL}/videogames`);
      const videogames = response.data;
      dispatch({ type: FETCH_VIDEOGAMES_SUCCESS, payload: videogames });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_ERROR, error });
    }
  };
};

export function getDetailVideogames(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${baseURL}/videogames/${id}`);
      dispatch({ type: GET_DETAIL_VIDEOGAME, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_ERROR, error });
    }
  };
}

export function emptyDetailVideogames() {
  return function (dispatch) {
    dispatch({ type: EMPTY_DETAIL_VIDEOGAME });
  };
}

export function getGenres() {
  return async function (dispatch) {
    const response = await axios.get(`${baseURL}/genres`)
    const genres = response.data;
    dispatch({type: GET_GENRES, payload: genres });
  };
}

export function searchVideogames(searchTerm) {
  return async (dispatch) => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await axios.get(`${baseURL}/videogames/search?name=${encodedSearchTerm}`)
      const games = response.data;

      dispatch({ type: SEARCH_VIDEOGAMES, payload: games })
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_ERROR, error });
    }
  };
}

export function orderVideogames(order) {
  return function (dispatch) {
    dispatch({ type: ORDER_VIDEOGAMES, payload: order });
  };
}

export function filterVideogames(filter) {
  return function (dispatch) {
    dispatch({ type: FILTER_VIDEOGAMES, payload: filter });
  };
}

export function emptyFilteredVideogames(){
  return function (dispatch) {
    dispatch({ type: EMPTY_FILTERED_VIDEOGAMES})
  }
}

export function createVideogame(obj) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseURL}/videogames`, obj, {
        headers: {
          "Content-Type:":"application/json",
        },
      });
      const createVideogame = response.data;
      dispatch({ type: CREATE_VIDEOGAME, payload: createVideogame });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_ERROR, error });
    }
  }
}

export function origenFilterVideogames(origen) {
  return function (dispatch) {
    dispatch(emptyFilteredVideogames(origen));
    dispatch({type: ORIGEN_FILTER_VIDEOGAMES, payload: origen });
  };
}

export function filterPlatform(platform) {
  return function (dispatch) {
    dispatch({ type: FILTER_PLATFORM, payload: platform})
  }
} */

