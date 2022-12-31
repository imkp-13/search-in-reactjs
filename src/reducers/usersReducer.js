export const initialState = {
  loading: false,
  data: [],
  query: "",
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "USERS_PENDING":
      return {
        ...state,
        loading: true,
        data: [],
      };
    case "USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "USERS_FAILED":
      return {
        ...state,
        loading: false,
        data: [],
      };
    case "SEARCH_USER":
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};
