import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { updateStudent } from "./store";
import CampusUpdate from "./CampusUpdate";

const Campus = () => {
  const { id } = useParams();
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    students: [],
  });

  useEffect(() => {
    const campus = campuses.find((campus) => campus.id === id);

    if (campus) {
      setInputs({
        ...inputs,
        name: campus.name,
        students: students.filter((student) => student.campusId === id),
      });
    }
  }, [campuses, students, id]);

  return (
    <div className="container">
      <div>
        <h3>Campus Detail</h3>
        <h4>{inputs.name}</h4>
        <div>
          <CampusUpdate />
        </div>
      </div>
      <div>
        <h3>Enrollee List</h3>
        <ul>
          {inputs.students.length > 0
            ? inputs.students.map((student) => {
                return (
                  <li key={student.id} className="li-compact">
                    <span className="enrollee-fl">
                      <Link to={`/students/${student.id}`}>
                        {student.firstName} {student.lastName}
                      </Link>
                    </span>
                    <span className="enrollee-fr">
                      <button
                        onClick={() => {
                          dispatch(
                            updateStudent({ ...student, campusId: null })
                          );
                        }}
                      >
                        Unenroll
                      </button>
                    </span>
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
