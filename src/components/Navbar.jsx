import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import { useAuth } from "../store/auth";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  const [darkMode, setDarkMode] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">
              <span className="logo-edu">Edu</span>
              <span className="logo-code ">Code</span>
            </NavLink>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>

          <nav className={menuOpen ? "open" : ""}>
            <ul>
              <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/service" onClick={() => setMenuOpen(false)}>
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </NavLink>
              </li>

              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout" onClick={() => setMenuOpen(false)}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                      Login
                    </NavLink>
                  </li>
                </>
              )}


              <li>
                <button
                  type="button"
                  className="darkmode-toggle"
                  onClick={() => {
                    setDarkMode(!darkMode);
                    setMenuOpen(false);
                  }}
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
