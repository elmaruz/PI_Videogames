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
      };
    // case "SORT_VIDS":
    //   if (action.payload) {
    //     let sortedChars = state.vidsList.sort((a, b) => {
    //       if (a.name.toLowerCase() > b.name.toLowerCase()) {
    //         return action.payload === "ASC" ? 1 : -1;
    //       }
    //       if (a.name.toLowerCase() < b.name.toLowerCase()) {
    //         return action.payload === "ASC" ? -1 : 1;
    //       }
    //       return 0;
    //     });
    //     return {
    //       ...state,
    //       vidsList: sortedChars,
    //     };
    //   }
    //   break;
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
    // case "SORTFILTER":
    //   if (action.payload) {
    //     let aux = state.apiList;
    //     let sortedVids = aux.sort((a, b) => {
    //       if (a.name > b.name) {
    //         return action.payload.sort === "ASC" ? 1 : -1;
    //       }
    //       if (a.name < b.name) {
    //         return action.payload.sort === "ASC" ? -1 : 1;
    //       }
    //       return 0;
    //     });
    //     let sortfilter = sortedVids.filter((elem) =>
    //       elem.genres.map((elem) => elem.name).includes(action.payload.genre)
    //     );

    //     return {
    //       ...state,
    //       vidsList: sortfilter,
    //     };
    //   }
    //   break;
    case "SEARCHFILTER":
      let auxApi = state.apiList;
      let aux = auxApi.filter(
        (elem) =>
          elem.genres.map((elem) => elem.name).includes(action.payload.genre) &&
          elem.name.toLowerCase().includes(action.payload.search.toLowerCase())
      );
      if (aux) {
        return {
          ...state,
          vidsList: aux,
        };
      } else {
        return {
          ...state,
          vidsList: auxApi.filter((elem) =>
            elem.name
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          ),
        };
      }
    // case "SFS":
    //   let api = state.apiList;
    //   let sortedVids = api.sort((a, b) => {
    //     if (a.name > b.name) {
    //       return action.payload.sort === "ASC" ? 1 : -1;
    //     }
    //     if (a.name < b.name) {
    //       return action.payload.sort === "ASC" ? -1 : 1;
    //     }
    //     return 0;
    //   });
    //   let sortfilter = sortedVids.filter(
    //     (elem) =>
    //       elem.genres.map((elem) => elem.name).includes(action.payload.genre) &&
    //       elem.name.toLowerCase().includes(action.payload.search.toLowerCase())
    //   );
    //   if (sortfilter) {
    //     return {
    //       ...state,
    //       vidsList: sortfilter,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       vidsList: api.filter((elem) =>
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
      if (action.payload.name === "db") {
        let filterApiDb = helper.filter((elem) => typeof elem.id === "string");
        if (action.payload.search) {
          filterApiDb = filterApiDb.filter((elem) =>
            elem.name.toLowerCase().includes(action.payload.search)
          );
        }
        return {
          ...state,
          vidsList: filterApiDb,
        };
      } else if (action.payload.name === "rawg") {
        let filterApiRawg = helper.filter(
          (elem) => typeof elem.id === "number"
        );
        if (action.payload.search) {
          filterApiRawg = filterApiRawg.filter((elem) =>
            elem.name.toLowerCase().includes(action.payload.search)
          );
        }
        return {
          ...state,
          vidsList: filterApiRawg,
        };
      }
    default:
      return state;
  }
}
