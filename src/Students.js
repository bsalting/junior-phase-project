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
      <div id="students-panel-l">
        <h3>Student Listing</h3>
        <ul>
          {students.map((student) => {
            const campus = campuses.find(
              (campus) => campus.id === student.campusId
            );

            return (
              <li key={student.id}>
                <div id="li-students">
                  <div>
                    <img src={student.imageUrl} alt="No photo.."></img>
                  </div>
                  <div>
                    <b>
                      {student.firstName} {student.lastName}
                    </b>
                    <br />
                    Email: {student.email}
                    <br />
                    Campus:{" "}
                    {campus ? <span> {campus.name} </span> : "Not enrolled"}
                    <br />
                    GPA: {student.gpa}
                    <br />
                    <Link to={`/students/${student.id}`}>
                      Update Details
                    </Link>{" "}
                    <button
                      onClick={() => {
                        dispatch(deleteStudent(student));
                      }}
                    >
                      x
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div id="students-panel-r">
        <StudentCreate />
      </div>
    </div>
  );
};

export default Students;
