import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCampus } from "./store";

const CampusCreate = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    imageUrl: "",
    description: "",
  });

  const onChange = (ev) => {
    setInputs({ ...inputs, [ev.target.name]: ev.target.value });
  };

  const save = (ev) => {
    ev.preventDefault();
    dispatch(createCampus(inputs));
    setInputs({
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    });
  };

  return (
    <div>
      <h3>Create Campus</h3>
      <form onSubmit={save}>
        <label> Name </label>
        <input name="name" value={inputs.name} onChange={onChange} />
        {" *"}
        <br />
        <label> Address </label>
        <input name="address" value={inputs.address} onChange={onChange} />
        {" *"}
        <br />
        <label> Image URL </label>
        <input name="imageUrl" value={inputs.imageUrl} onChange={onChange} />
        <br />
        <label> Description </label>
        <input
          name="description"
          value={inputs.description}
          onChange={onChange}
        />
        <br />
        <button
          disabled={!inputs.name || !inputs.address}
          className="form-button"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CampusCreate;
