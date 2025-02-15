import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  // Simple function to check if user is logged in
  const isAuthenticated = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    console.log("isAuthenticated:", loggedIn);
    return loggedIn;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root to either /invoice (if logged in) or /login (if not) */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/invoice" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/invoice"
          element={
            isAuthenticated() ? <InvoiceForm /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
