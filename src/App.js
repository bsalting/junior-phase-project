import React, { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampuses, fetchStudents } from "./store";
import Campuses from "./Campuses";
import Campus from "./Campus";
import Students from "./Students";
import Student from "./Student";

const App = () => {
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/campuses">Campuses ({campuses.length})</Link>
        <Link to="/students">Students ({students.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>This is home page</div>} />
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/campuses/:id" element={<Campus />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<Student />} />
      </Routes>
    </div>
  );
};

export default App;
