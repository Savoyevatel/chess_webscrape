import {
    OPENING_SAVE_REQUEST,
    OPENING_SAVE_SUCCESS,
    OPENING_SAVE_FAIL,
    OPENING_SAVE_RESET,
  } from '../constants/openingConstants';
  
  export const openingSaveReducer = (state = {}, action) => {
    switch (action.type) {
      case OPENING_SAVE_REQUEST:
        return { loading: true };
      case OPENING_SAVE_SUCCESS:
        return { loading: false, success: true, opening: action.payload };
      case OPENING_SAVE_FAIL:
        return { loading: false, error: action.payload };
      case OPENING_SAVE_RESET:
        return {};
      default:
        return state;
    }
  };
  