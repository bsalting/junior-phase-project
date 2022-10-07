import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CampusUpdate from "./CampusUpdate";

const Campus = () => {
  const { id } = useParams();
  const { campuses, students } = useSelector((state) => state);
  const campus = campuses.find((campus) => campus.id === id) || {};
  const enrollees = students.filter((student) => student.campusId === id) || [];

  return (
    <div className="container">
      <div>
        <h3>Campus Detail</h3>
        <ul>
          <li>
            <h4>{campus.name}</h4>
          </li>
        </ul>
        <div>
          <CampusUpdate />
        </div>
      </div>
      <div>
        <h3>Enrollee List</h3>
        <ul>
          {enrollees.length > 0
            ? enrollees.map((enrollee) => {
                return (
                  <li key={enrollee.id} className="li-compact">
                    <Link to={`/students/${enrollee.id}`}>
                      {enrollee.firstName} {enrollee.lastName}
                    </Link>
                  </li>
                );
              })
            : "No enrollee"}
        </ul>
      </div>
    </div>
  );
};

export default Campus;
