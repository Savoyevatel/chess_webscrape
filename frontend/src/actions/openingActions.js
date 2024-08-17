import axios from 'axios';
import {
  OPENING_SAVE_REQUEST,
  OPENING_SAVE_SUCCESS,
  OPENING_SAVE_FAIL,
  OPENING_SAVE_RESET,
} from '../constants/openingConstants';

export const saveOpening = (openingData) => async (dispatch, getState) => {
  try {
    dispatch({ type: OPENING_SAVE_REQUEST });

    // You can add authentication headers here if needed.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // JWT token
      },
    };

    const { data } = await axios.post('/api/chess/save-result/', openingData, config);

    dispatch({
      type: OPENING_SAVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OPENING_SAVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetOpeningSave = () => (dispatch) => {
  dispatch({ type: OPENING_SAVE_RESET });
};
