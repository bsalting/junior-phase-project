import React, { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampuses } from "./store";
import Campuses from "./Campuses";

const App = () => {
  const { campuses } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampuses());
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/campuses">Campuses ({campuses.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>This is home page</div>} />
        <Route path="/campuses" element={<Campuses />} />
      </Routes>
    </div>
  );
};

export default App;
