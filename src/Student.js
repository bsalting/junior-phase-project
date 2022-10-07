import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const Student = () => {
  const { students, campuses } = useSelector((state) => state);
  const { id } = useParams();
  const student = students.find((student) => student.id === id) || {};
  const campus =
    campuses.find((campus) => campus.id === student.campusId) || {};

  return (
    <div className="container">
      <div>
        <h3>Student Detail</h3>
        <h4>
          {student.firstName} {student.lastName}{" "}
          {campus.id ? (
            <Link to={`/campuses/${campus.id}`}> ({campus.name}) </Link>
          ) : (
            "(Not enrolled)"
          )}
        </h4>
      </div>
    </div>
  );
};

export default Student;
