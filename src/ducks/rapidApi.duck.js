import axios from "axios";

// constants
export const FETCH_DICTIONARY_REQUEST = "FETCH_DICTIONARY_REQUEST";

// initialState
const initialState = {
  dictionary: [],
};

// action creators
export const fetchDictionary = (searchWord) => async (dispatch) => {
  const data = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
  );

  dispatch({
    type: FETCH_DICTIONARY_REQUEST,
    payload: data.data,
  });
};

// reducer
const apiReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_DICTIONARY_REQUEST:
      return { ...state, dictionary: payload };
    default:
      return state;
  }
};

export default apiReducer;
