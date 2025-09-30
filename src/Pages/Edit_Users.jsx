import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { AdminNav } from "../components/AdminNav";

export const EditUsers = () => {
  const { id } = useParams();
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://educode-backend-six.vercel.app/api/admin/users/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("update successfully");
        navigate("/admin/users");
      } else {
        toast.error(`update failed: $data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://educode-backend-six.vercel.app/api/admin/users/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        console.error("Fetch error:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return null; // Or return <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container">
              <div className="registration-form">
                <h1 className="main-heading mb-3">Update User Data</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      required
                      autoComplete="off"
                      value={userData.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={userData.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={userData.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button
                    type="submit"
                    style={{
                      marginTop: "1rem",
                      padding: "1rem 1rem",
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
