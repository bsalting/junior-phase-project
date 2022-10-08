import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCampus } from "../store";
import { Link } from "react-router-dom";
import CampusCreate from "./CampusCreate";

const Campuses = () => {
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div id="campuses-panel-l">
        <h3>Campus Roster</h3>
        <ul>
          {campuses.map((campus) => {
            const enrollees = students.filter(
              (student) => student.campusId === campus.id
            );
            return (
              <li key={campus.id}>
                <div id="li-campuses">
                  <div>
                    <img src={campus.imageUrl} alt="No photo.."></img>
                  </div>
                  <div>
                    <b>{campus.name}</b> ({enrollees.length}
                    {enrollees.length > 1
                      ? " enrollments"
                      : " enrollment"}) <br />
                    {campus.address} <br />
                    {campus.description} <br />
                    <Link to={`/campuses/${campus.id}`}>Update</Link>{" "}
                    <button
                      className="x-button"
                      onClick={() => {
                        dispatch(deleteCampus(campus));
                      }}
                    >
                      <b>x</b>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div id="campuses-panel-r">
        <CampusCreate />
      </div>
    </div>
  );
};

export default Campuses;
