import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link, NavLink } from "react-router-dom";
import { AdminNav } from "../components/AdminNav";
import "../style/adminUser.css";

export const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("https://educode-backend-six.vercel.app/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.log(error, "from admin user page");
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://educode-backend-six.vercel.app/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      const data = await response.json();
      
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
    {/* <AdminNav /> */}
      <section className="admin-users-section">
        <div className="userDetail">
          <h2>Welcome Admin: {user?.username}</h2>
          <h3>Email: {user?.email}</h3>
        </div>
        <div className="admin-users-header">
          <h1 className="admin-users-title">All Users List</h1>
        </div>

        <div className="admin-users-table-wrapper">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th className="admin-users-th">Name</th>
                <th className="admin-users-th">Email</th>
                <th className="admin-users-th">Phone</th>
                <th className="admin-users-th">Update</th>
                <th className="admin-users-th">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUsers) => (
                <tr key={curUsers._id}>
                  <td className="admin-users-td">{curUsers.username}</td>
                  <td className="admin-users-td">{curUsers.email}</td>
                  <td className="admin-users-td">{curUsers.phone}</td>
                  <td className="admin-users-td">
                    <NavLink
                      className="admin-users-edit"
                      to={`/admin/users/edit/${curUsers._id}`}
                    >
                      Edit
                    </NavLink>
                  </td>
                  <td className="admin-users-td">
                    <button
                      className="admin-users-delete-btn"
                      onClick={() => deleteUser(curUsers._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
