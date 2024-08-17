import {
    OPENING_LIST_REQUEST,
    OPENING_LIST_SUCCESS,
    OPENING_LIST_FAIL,
    OPENING_DELETE_REQUEST,
    OPENING_DELETE_SUCCESS,
    OPENING_DELETE_FAIL,
  } from '../constants/savedConstants';
  
  export const openingListReducer = (state = { savedOpenings: [] }, action) => {
    switch (action.type) {
      case OPENING_LIST_REQUEST:
        return { loading: true, savedOpenings: [] };
      case OPENING_LIST_SUCCESS:
        return { loading: false, savedOpenings: action.payload };
      case OPENING_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const openingDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case OPENING_DELETE_REQUEST:
        return { loading: true };
      case OPENING_DELETE_SUCCESS:
        return { loading: false, success: true };
      case OPENING_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };