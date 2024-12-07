import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/users", {
        params: { page, limit: 10, search },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    const debounceFetch = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounceFetch);
  }, [search, page]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "50%" }}
      />
      <table border="1" cellPadding="12" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
