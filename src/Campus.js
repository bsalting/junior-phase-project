import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

const Campus = () => {
  const { id } = useParams();
  const { campuses, students } = useSelector((state) => state);
  const campus = campuses.find((campus) => campus.id === id) || {};
  const enrollees = students.filter((student) => student.campusId === id) || [];

  return (
    <div className="container">
      <div>
        <h3>Campus Detail</h3>
        <img src={campus.imageUrl}></img>
        <ul>
          <li> Name: {campus.name} </li>
          <li> Address: {campus.address} </li>
          <li> Description: {campus.description} </li>
        </ul>
      </div>
      <div>
        <h3>Student List</h3>
        <ul>
          {enrollees.length > 0
            ? enrollees.map((enrollee) => {
                return (
                  <li key={enrollee.id}>
                    <Link to={`/students/${enrollee.id}`}>
                      {enrollee.firstName} {enrollee.lastName}
                    </Link>
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
