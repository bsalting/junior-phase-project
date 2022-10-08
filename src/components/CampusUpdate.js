import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCampus } from "../store";

const CampusUpdate = () => {
  const { id } = useParams();
  const { campuses } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const campus = campuses.find((campus) => campus.id === id);
    if (campus) {
      setInputs({
        ...inputs,
        name: campus.name,
        imageUrl: campus.imageUrl,
        address: campus.address,
        description: campus.description,
      });
    }
  }, [campuses, id]);

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
      dispatch(updateCampus(updated));
    } catch (ex) {
      console.log(ex.response.data);
    }
    setEdit(false);
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={save}>
          <label> Name </label>
          <input
            name="name"
            value={inputs.name}
            onChange={onChange}
            disabled={edit ? "" : "disabled"}
          />
          &bull; <br />
          <label> Address </label>
          <input
            name="address"
            value={inputs.address}
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
          <label> Description </label>
          <input
            name="description"
            value={inputs.description}
            onChange={onChange}
            disabled={edit ? "" : "disabled"}
          />
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

export default CampusUpdate;
