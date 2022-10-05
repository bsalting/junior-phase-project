import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const campuses = (state = [], action) => {
  if (action.type === "SET_CAMPUSES") {
    return action.campuses;
  }
  if (action.type === "DELETE_CAMPUS") {
    return state.filter((campus) => campus.id !== action.campus.id);
  }
  if (action.type === "CREATE_CAMPUS") {
    return [...state, action.campus];
  }
  return state;
};

const reducer = combineReducers({
  campuses,
});

const _setCampuses = (campuses) => {
  return {
    type: "SET_CAMPUSES",
    campuses,
  };
};

const _deleteCampus = (campus) => {
  return {
    type: "DELETE_CAMPUS",
    campus,
  };
};

export const fetchCampuses = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/campuses");
    dispatch(_setCampuses(response.data));
  };
};

export const deleteCampus = (campus) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    dispatch(_deleteCampus(campus));
  };
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
