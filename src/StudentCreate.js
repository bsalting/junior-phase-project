import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "./store";

const StudentCreate = () => {
  const { campuses } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: 0.0,
    campusId: null,
  });

  const onChange = (ev) => {
    setInputs({ ...inputs, [ev.target.name]: ev.target.value });
  };

  const save = (ev) => {
    ev.preventDefault();
    dispatch(createStudent(inputs));
    setInputs({
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      gpa: 0.0,
      campusId: null,
    });
  };

  return (
    <div>
      <h3>Create Student</h3>
      <form onSubmit={save}>
        <label> First Name </label>
        <input name="firstName" value={inputs.firstName} onChange={onChange} />
        {" *"}
        <br />
        <label> Last Name </label>
        <input name="lastName" value={inputs.lastName} onChange={onChange} />
        {" *"}
        <br />
        <label> Email </label>
        <input name="email" value={inputs.email} onChange={onChange} />
        {" *"}
        <br />
        <label> Image URL </label>
        <input name="imageUrl" value={inputs.imageUrl} onChange={onChange} />
        <br />
        <label> GPA </label>
        <input name="gpa" value={inputs.gpa} onChange={onChange} />
        <br />
        <label> Campus </label>
        <select name="campusId" value={inputs.campusId} onChange={onChange}>
          <option value=""> Select... </option>
          {campuses.map((campus) => {
            return (
              <option value={campus.id} key={campus.id}>
                {campus.name}
              </option>
            );
          })}
        </select>
        <br />
        <button
          className="form-button"
          disabled={!inputs.firstName || !inputs.lastName || !inputs.email}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default StudentCreate;
