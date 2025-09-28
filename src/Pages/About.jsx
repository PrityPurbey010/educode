import { Analytics } from "../components/Analytics";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../style/analytics.css";
import "../style/about.css";
import { Navbar } from "../components/Navbar";

export const About = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols hero-grid">
            <div className="hero-content">
              <p className="welcome-text">
                Welcome {user ? `${user.username} to EduCode` : `to EduCode`}
              </p>
              <h1 className="hero-title">Why Choose EduCode?</h1>

              <p className="hero-desc">
                At EduCode, we provide students with access to high-quality
                courses in modern web and software development. Learn
                technologies like MERN stack, Python, React, and more — all at
                your own pace.
                <br /> <br />
                Our platform is designed to give hands-on experience. Each
                course includes practical projects, exercises, and real-world
                examples so you can build your portfolio while learning.
                <br />
                <br />
                With expert instructors and a community of learners, EduCode
                ensures you get the guidance and support needed to master new
                skills and advance your career in tech.
                <br />
                <br />
                Enroll in any course and start your journey today. Whether
                you're a beginner or looking to upskill, EduCode provides
                structured learning paths tailored to your goals.
              </p>

              <div className="hero-btns">
                <NavLink to="/contact">
                  <button className="primary-btn">Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="secondary-btn">Learn More</button>
                </NavLink>
              </div>
            </div>

            {/* hero image */}
            <div className="about-image">
              <img
                src="/image/aboutUsImg.jpg"
                alt="About Us"
                width="400"
                height="400"
                className="aboutImg"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}
      <Analytics />
    </>
  );
};
