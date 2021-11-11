const initialState = {
  vidsList: [],
  apiList: [],
  details: [],
  genres: [],
  gameCreated: undefined,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDS":
      return {
        ...state,
        vidsList: action.payload,
        apiList: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "SEARCH_VIDS":
      return {
        ...state,
        vidsList: action.payload,
        apiList: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "FILTER_GENRES":
      if (action.payload) {
        let filterList = state.apiList.filter((elem) =>
          elem.genres.map((elem) => elem.name).includes(action.payload)
        );
        return {
          ...state,
          vidsList: filterList,
        };
      }
      break;
    case "CREATE_GAME":
      return {
        ...state,
        gameCreated: action.payload,
      };
    case "SELECT_DB":
      let helper = state.apiList;
      let filterApiDb = helper.filter((elem) => typeof elem.id === "string");
      if (action.payload.name === "DB") {
        if (action.payload.search) {
          filterApiDb = filterApiDb.filter((elem) =>
            elem.name
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          );
        }
        if (action.payload.genre) {
          filterApiDb = filterApiDb.filter((elem) =>
            elem.genres.map((elem) => elem.name).includes(action.payload.genre)
          );
        }
        return {
          ...state,
          vidsList: filterApiDb,
        };
      } else if (action.payload.name === "Rawg") {
        let auxiliary = state.apiList;
        let filterApiRawg = auxiliary.filter(
          (elem) => typeof elem.id === "number"
        );
        if (action.payload.search) {
          filterApiRawg = filterApiRawg.filter((elem) =>
            elem.name
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          );
        }
        if (action.payload.genre) {
          filterApiRawg = filterApiRawg.filter((elem) =>
            elem.genres.map((elem) => elem.name).includes(action.payload.genre)
          );
        }
        return {
          ...state,
          vidsList: filterApiRawg,
        };
      }
      break;
    default:
      return state;
  }
}
