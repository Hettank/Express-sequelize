import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // states for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);

  // fetch users with pagination and search
  const fetchUsers = async (
    searchQuery = "",
    page = 1,
    limit = 10,
    activeStatus,
    inactiveStatus
  ) => {
    try {
      const response = await axios.get(`${API}/api/users`, {
        params: {
          search: searchQuery,
          page,
          limit,
          active: activeStatus,
          inactive: inactiveStatus,
        },
      });

      setUsers(response.data.rows);
      setTotalUsers(response.data.count);
    } catch (error) {
      console.log("Error getting users", error);
    }
  };

  useEffect(() => {
    fetchUsers(search, currentPage, pageSize, active, inactive);
  }, [currentPage, pageSize, search, active, inactive]);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `${API}/api/users/deleteUser/${userId}`
      );

      if (response.status === 200) {
        alert("Deleted successfully");
        fetchUsers(search, currentPage, pageSize, active, inactive);
      }
    } catch (error) {
      console.log("Error deleting user");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleActiveChange = (e) => {
    setActive(e.target.checked);
    setCurrentPage(1);
  };

  const handleInactiveChange = (e) => {
    setInactive(e.target.checked);
    setCurrentPage(1);
  };

  console.log("users", users);

  return (
    <div className="user-container">
      <div className="title-container">
        <h2>Users</h2>
        <Link to="/create-user" className="btn create-user">
          Create User
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="filters-container">
        <h4>Apply Filters</h4>
        <div>
          <label htmlFor="">Active</label>
          <input
            type="checkbox"
            checked={active}
            id="active-filter"
            onChange={handleActiveChange}
          />
        </div>
        <div>
          <label htmlFor="">Inactive</label>
          <input
            type="checkbox"
            checked={inactive}
            id="inactive-filter"
            onChange={handleInactiveChange}
          />
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="thumbnail"
                    src={
                      user.profilePic
                        ? `${API}/uploads/${user.profilePic}`
                        : `../public/user.png`
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className={user.status === true ? "active" : "inactive"}>
                  {user.status ? "Active" : "Inactive"}
                </td>
                <td>{user.phone}</td>
                <td>
                  <div className="action-container">
                    <Link to="/update-user" state={{ user }}>
                      <PencilSimple size={20} className="phsr-icon" />
                    </Link>
                    <Trash
                      size={20}
                      className="phsr-icon"
                      onClick={() => handleDelete(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Data Available to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        current={currentPage} // current selected page
        pageSize={pageSize}
        total={totalUsers}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["5", "10", "20"]}
        showTotal={(total) => `Total ${total} users`}
      />
    </div>
  );
};

export default Users;
