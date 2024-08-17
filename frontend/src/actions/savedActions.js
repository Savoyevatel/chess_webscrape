import axios from 'axios';
import {
  OPENING_LIST_REQUEST,
  OPENING_LIST_SUCCESS,
  OPENING_LIST_FAIL,

  OPENING_DELETE_REQUEST,
  OPENING_DELETE_SUCCESS,
  OPENING_DELETE_FAIL,
} from '../constants/savedConstants';

export const listSavedOpenings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OPENING_LIST_REQUEST });

    // You can add authentication headers here if needed.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, // Assuming JWT token
      },
    };

    const { data } = await axios.get('/api/chess/saved-results/', config);

    dispatch({
      type: OPENING_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OPENING_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const deleteOpening = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: OPENING_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/chess/delete-opening/${id}/`, config);

    dispatch({ type: OPENING_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: OPENING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};