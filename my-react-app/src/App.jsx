import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import UserList from "./pages/UserList.jsx";
import EditUser from "./pages/EditUser.jsx";
import UserSearch from "./pages/UserSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/search" element={<UserSearch />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
