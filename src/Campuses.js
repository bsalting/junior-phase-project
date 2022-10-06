import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCampus } from "./store";
import { Link } from "react-router-dom";

const Campuses = () => {
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <ul>
      {campuses.map((campus) => {
        const enrollees = students.filter(
          (student) => student.campusId === campus.id
        );
        return (
          <li key={campus.id}>
            {campus.name} {enrollees.length}
            {enrollees.length > 1 ? " enrollments" : " enrollment"}{" "}
            <Link to={`/campuses/${campus.id}`}>Campus Details</Link>{" "}
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
