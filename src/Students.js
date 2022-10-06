import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "./store";
import { Link } from "react-router-dom";

const Students = () => {
  const { students, campuses } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <ul>
      {students.map((student) => {
        const campus = campuses.find(
          (campus) => campus.id === student.campusId
        );

        return (
          <li key={student.id}>
            {student.firstName} {student.lastName}
            {campus ? <span> attends {campus.name}</span> : null}{" "}
            <Link to={`/students/${student.id}`}>Student Detail</Link>{" "}
            <button
              onClick={() => {
                dispatch(deleteStudent(student));
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

export default Students;
