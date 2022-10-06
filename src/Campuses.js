import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCampus } from "./store";
import { Link } from "react-router-dom";
import CampusCreate from "./CampusCreate";

const Campuses = () => {
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="panel">
        <h3>Campus Listing</h3>
        <ul>
          {campuses.map((campus) => {
            const enrollees = students.filter(
              (student) => student.campusId === campus.id
            );
            return (
              <li key={campus.id}>
                <b>{campus.name}</b> ({enrollees.length}
                {enrollees.length > 1 ? " enrollments" : " enrollment"}) <br />
                <Link to={`/campuses/${campus.id}`}>Campus Details</Link>{" "}
                <button
                  onClick={() => {
                    dispatch(deleteCampus(campus));
                  }}
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="panel">
        <CampusCreate />
      </div>
    </div>
  );
};

export default Campuses;
