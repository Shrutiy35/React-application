import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import UserCard from "../components/UserCard";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${page}`
        );
        setUsers(response.data.data);
        setFilteredUsers(response.data.data); // Initialize filtered users
        setTotalPages(response.data.total_pages); // Update total pages
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [page]);

  // Update the specific user's data if passed from EditUser
  useEffect(() => {
    if (location.state?.updatedUser) {
      const updatedUser = location.state.updatedUser;
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
    }
  }, [location.state]);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      )
    );
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Failed to delete user");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl font-serif font-bold text-gray-800 mb-8 text-center animate-pulse">
        User List
      </h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/2 p-2 border rounded shadow"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => handleEdit(user.id)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;
