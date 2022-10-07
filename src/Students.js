import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "./store";
import { Link } from "react-router-dom";
import StudentCreate from "./StudentCreate";

const Students = () => {
  const { students, campuses } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div>
        <h3>Student Listing</h3>
        <ul>
          {students.map((student) => {
            const campus = campuses.find(
              (campus) => campus.id === student.campusId
            );

            return (
              <li key={student.id}>
                <b>
                  {student.firstName} {student.lastName}
                </b>
                {campus ? <span> (attends {campus.name})</span> : null} <br />
                <Link to={`/students/${student.id}`}>Student Detail</Link>{" "}
                <button
                  onClick={() => {
                    dispatch(deleteStudent(student));
                  }}
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <StudentCreate />
      </div>
    </div>
  );
};

export default Students;
