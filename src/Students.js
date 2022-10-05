import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "./store";

const Students = () => {
  const { students } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <ul>
      {students.map((student) => {
        return (
          <li key={student.id}>
            {student.firstName} {student.lastName}{" "}
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
