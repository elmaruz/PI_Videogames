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
    // case "SEARCHFILTER":
    //   let auxApi = state.apiList;
    //   // let aux = auxApi.filter(
    //   //   (elem) =>
    //   //     elem.genres.map((elem) => elem.name).includes(action.payload.genre) &&
    //   //     elem.name.toLowerCase().includes(action.payload.search.toLowerCase())
    //   // );
    //   let aux = auxApi.filter(
    //     (elem) =>
    //       elem.genres.map((elem) => elem.name.includes(action.payload.genre)) &&
    //       elem.name.toLowerCase().includes(action.payload.search)
    //   );
    //   if (aux) {
    //     return {
    //       ...state,
    //       vidsList: aux,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       vidsList: auxApi.filter((elem) =>
    //         elem.name
    //           .toLowerCase()
    //           .includes(action.payload.search.toLowerCase())
    //       ),
    //     };
    //   }
    case "CREATE_GAME":
      return {
        ...state,
        gameCreated: action.payload,
      };
    case "SELECT_DB":
      let helper = state.apiList;
      if (action.payload.name === "DB") {
        let filterApiDb = helper.filter((elem) => typeof elem.id === "string");
        if (action.payload.search) {
          filterApiDb = filterApiDb.filter((elem) =>
            elem.name.toLowerCase().includes(action.payload.search)
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
        let filterApiRawg = helper.filter(
          (elem) => typeof elem.id === "number"
        );
        if (action.payload.search) {
          filterApiRawg = filterApiRawg.filter((elem) =>
            elem.name.toLowerCase().includes(action.payload.search)
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
