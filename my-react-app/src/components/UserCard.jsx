import React from "react";

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="p-4 border rounded shadow transform transition-transform duration-300 hover:scale-105">
      <img
        src={user.avatar}
        alt={user.first_name}
        className="w-16 h-16 rounded-full mb-2"
      />
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <button onClick={onEdit} className="text-blue-500 cursor-pointer">
        Edit
      </button>
      <button onClick={onDelete} className="text-red-500 ml-2 cursor-pointer">
        Delete
      </button>
    </div>
  );
}

export default UserCard;
