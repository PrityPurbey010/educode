import { useState } from "react";
import { useAuth } from "../store/auth";
import "../style/contact.css";
import { Navbar } from "../components/Navbar";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};
export const Contact = () => {
  const [contact, setContact] = useState({ defaultContactFormData });
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://educode-backend-six.vercel.app/api/form/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );
      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();

        alert("message send successfully");
      }
    } catch (error) {
      console.log(error);
      alert("message not send ");
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <main>
          <div className="section-contact">
            <div className="container grid grid-two-cols">
              <div className="contact-image">
                <img
                  src="/image/contact-img.png"
                  alt="we always ready to help"
                  width={500}
                  height={500}
                />
              </div>

              <section className="section-form">
                <form onSubmit={handleSubmit} className="login-form">
                  <h1 className="main-heading">Contact Us</h1>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      required
                      value={contact.username || ""}
                      onChange={handleInput}
                      placeholder="Enter username"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      id="emaile"
                      required
                      value={contact.email}
                      onChange={handleInput}
                      placeholder="Enter email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message">message</label>
                    <textarea
                      name="message"
                      id="mesage"
                      value={contact.message}
                      onChange={handleInput}
                      cols="30"
                      rows="5"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <br />
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </form>
              </section>
            </div>

            <section className="mb-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502
                         .2319599379393!2d77.29165337506538!3d28
                         .622809275670086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.
                         1!3m3!1m2!1s0x390ce5fc05fc00cd%3A0x8956f849d514bad1!2sMandwali
                         !5e0!3m2!1sen!2sin!4v1755087859142!5m2!1sen!2sin"
                width="100%"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </section>
          </div>
        </main>
      </section>
    </>
  );
};
