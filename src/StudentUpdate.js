import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateStudent } from "./store";

const StudentUpdate = () => {
  const { id } = useParams();
  const { students, campuses } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: 0,
    campusId: "",
  });

  useEffect(() => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setInputs({
        ...inputs,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        imageUrl: student.imageUrl,
        gpa: student.gpa,
        campusId: student.campusId,
      });
    }
  }, [students, id]);

  const onChange = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value,
    });
  };

  const save = (ev) => {
    ev.preventDefault();
    const updated = { id, ...inputs };
    try {
      dispatch(updateStudent(updated));
    } catch (ex) {
      console.log(ex.response.data);
    }
    setEdit(false);
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={save}>
          <label> First Name </label>
          <input
            name="firstName"
            value={inputs.firstName}
            onChange={onChange}
            disabled={edit ? "" : "disabled"}
          />
          &bull; <br />
          <label> Last Name </label>
          <input
            name="lastName"
            value={inputs.lastName}
            onChange={onChange}
            disabled={edit ? "" : "disabled"}
          />
          &bull; <br />
          <label> Email </label>
          <input
            name="email"
            value={inputs.email}
            onChange={onChange}
            disabled={edit ? "" : "disabled"}
          />
          &bull; <br />
          <label> Image URL </label>
          <input
            name="imageUrl"
            value={inputs.imageUrl}
            onChange={onChange}
            disabled={edit ? "" : "disabled"}
          />
          <br />
          <label> GPA </label>
          <input
            name="gpa"
            value={inputs.gpa}
            onChange={onChange}
            disabled={edit ? "" : "disabled"}
          />
          <br />
          <label> Campus </label>
          <select
            name="campusId"
            value={inputs.campusId}
            onChange={(ev) =>
              setInputs({
                ...inputs,
                campusId: ev.target.value === "" ? null : ev.target.value,
              })
            }
            disabled={edit ? "" : "disabled"}
          >
            <option value="">Select...</option>
            {campuses.map((campus) => {
              return (
                <option value={campus.id} key={campus.id}>
                  {campus.name}
                </option>
              );
            })}
          </select>
          <br />
          <div className="container-btn">
            <button disabled={!edit} className="form-button2a">
              Save
            </button>
            <button
              className="form-button2b"
              onClick={() => setEdit(true)}
              disabled={edit ? "disabled" : ""}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentUpdate;
