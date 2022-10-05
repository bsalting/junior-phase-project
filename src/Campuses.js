import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCampus } from "./store";

const Campuses = () => {
  const { campuses } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <ul>
      {campuses.map((campus) => {
        return (
          <li key={campus.id}>
            {campus.name}
            <button
              onClick={() => {
                dispatch(deleteCampus(campus));
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Campuses;
