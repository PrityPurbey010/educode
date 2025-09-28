import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "../style/login.css";
import { Navbar } from "../components/Navbar";

export const Login = () => {
  const { storeTokenInLS, setLoggedInUser , userAuthentication} = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
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
    const body = {
      email: userData.email?.trim()?.toLocaleLowerCase(),
      password: userData.password?.trim(),
    };
    try {
      const response = await fetch(`https://educode-backend-six.vercel.app/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        if (res_data?.data?.isAdmin) {
          setUserData(res_data.data);
          await userAuthentication();

          navigate("/admin/users");
          setUserData({ email: "", password: "" });
        } else {
          navigate("/");
        }
      } else {
        toast.error("invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <main>
          <div className="section-login">
            <div className="container">
              <div className="login-image">
                <img
                  src="/image/loginImg.jpg"
                  alt="let's fill the login form"
                  width={500}
                  height={500}
                />
              </div>
              <div className="">
                <div className="crediv">
                  <h2 className="adminCred">Admin Credential:</h2>
                  <h3>Email: jenny@gmail.com</h3>
                  <h3>Password: Test@123</h3>
                </div>
                <div className="login-form">
                  <h1 className="main-heading mb-3">Login form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="email">email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        id="email"
                        required
                        value={userData.email}
                        onChange={handleInput}
                      />
                    </div>

                    <div>
                      <label htmlFor="password">password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        id="password"
                        required
                        value={userData.password}
                        onChange={handleInput}
                      />
                    </div>
                    <br />
                    <button type="submit" className="">
                      Login
                    </button>
                  </form>
                  <p className="registerNow">
                    Don't have account.{" "}
                    <NavLink to={"/register"} className="registerNowText">
                      Register Now
                    </NavLink>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
