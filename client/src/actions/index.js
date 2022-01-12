import axios from 'axios';

export function getVids() {
  return function (dispatch) {
    axios.get(`/videogames`).then((videogames) => {
      dispatch({ type: 'GET_VIDS', payload: videogames.data });
    });
  };
}

export function getDetails(id) {
  return function (dispatch) {
    axios.get(`/videogame/${id}`).then((details) => {
      dispatch({ type: 'GET_DETAILS', payload: details.data });
    });
  };
}

export function searchVids(id) {
  return function (dispatch) {
    axios.get(`/videogames?name=${id}`).then((search) => {
      dispatch({ type: 'SEARCH_VIDS', payload: search.data });
    });
  };
}

export function getGenres() {
  return function (dispatch) {
    axios.get(`/genres`).then((genres) => {
      dispatch({ type: 'GET_GENRES', payload: genres.data });
    });
  };
}

export function filterGenres(genre) {
  return {
    type: 'FILTER_GENRES',
    payload: genre,
  };
}
export function searchFilter(search, genre) {
  return {
    type: 'SEARCHFILTER',
    payload: { search, genre },
  };
}

export function createGame(obj) {
  return function (dispatch) {
    axios.post(`/videogame`, obj).then((r) => {
      dispatch({ type: 'CREATE_GAME', payload: r.data });
    });
  };
}

export function selectDb(name, search, genre) {
  return {
    type: 'SELECT_DB',
    payload: { name, search, genre },
  };
}
