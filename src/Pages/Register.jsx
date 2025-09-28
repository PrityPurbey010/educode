import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../style/Register.css";
import { Navbar } from "../components/Navbar";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
   
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: user.username,
      email: user.email.trim().toLocaleLowerCase(),
      phone: user.phone.trim(),
      password: user.password?.trim(),
    };

    try {
      const response = await fetch(`https://educode-backend-six.vercel.app/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const res_data = await response.json();
     
       
        storeTokenInLS(res_data.token);

        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
      }
      
    } catch (error) {
      console.log("resgister", error);
    }
  };

  return (
    <>
      <Navbar />

      <section>
        <main>
          <div className="section-registration">
            <div className="container">
              <div className="registration-image">
                <img
                  src="/image/contact-img.png"
                  alt="a girl is typing to do registration"
                  width={500}
                  height={500}
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit} className="regForm">
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      id="username"
                      required
                      
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter email"
                      id="email"
                      required
                      
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter phone number"
                      id="phone"
                      required
                      
                      value={user.phone}
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
                      
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
                <p className="registerNow">
                  Already have account.{" "}
                  <NavLink to={"/login"} className="registerNowText">
                    Login
                  </NavLink>{" "}
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
