import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PlannerApp from './pages/PlannerApp'; 
import ProtectedRoute from "./utils/ProtectedRoute";
console.log("ProtectedRoute:", ProtectedRoute);




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/app"
  element={
    // <ProtectedRoute>
      <PlannerApp />
    // </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
