import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import "../style/home.css";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <>
    <Navbar />
      <main className="mainDiv">
        <section className="home-section">
          <div className="flexDiv">
            <div className="textContent">
              <p className="heading">Education unlocks success 💡</p>
              <h1 className="mainTitle">
                Welcome to <span className="logo-edu">Edu</span>
                <span className="logo-code ">Code</span>
              </h1>
              <p className="desc">
                At EduCode, we empower students and professionals to learn
                modern web and software development. From beginner-friendly
                lessons to advanced projects, our platform is built to help you
                grow your skills step by step.
              </p>

              <div className=" hero-btns">
                <NavLink to="/contact">
                  <button className="primary-btn">Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="secondary-btn">Learn More</button>
                </NavLink>
              </div>
            </div>
            <div className="imgDiv">
              <img
                src="/image/bookImg.jpg"
                alt="coding together"
                className="hero-image"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}
      <Analytics />

      <main className="mainDiv">
        <section className="home-section">
          <div className="flexDiv">
            <div className="imgDiv">
              <img
                src="/image/homeImg2.jpg"
                alt="coding together"
                className="hero-image"
              />
            </div>
            <div className="textContent">
              <p className="heading">We are here to help you</p>
              <h1 className="mainTitle">Get Started Today</h1>
              <p className="desc">
                Join thousands of learners building careers in tech with
                EduCode. Explore structured learning paths in MERN stack,
                Python, React, and more. Work on real-world projects, showcase
                your portfolio, and gain the confidence to crack interviews or
                launch your own startup ideas.
              </p>

              <div className=" hero-btns">
                <NavLink to="/contact">
                  <button className="primary-btn">Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="secondary-btn">Learn More</button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  );
};
