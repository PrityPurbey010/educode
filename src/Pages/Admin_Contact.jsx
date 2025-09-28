import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "../style/callback.css";
import { AdminNav } from "../components/AdminNav";

export const AdminContacts = () => {
  const { AuthorizationToken } = useAuth();
  const [contactData, setContactData] = useState([]);

  const getContactsData = async () => {
    try {
      const response = await fetch("https://educode-backend-six.vercel.app/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) setContactData(data || []);
    } catch (error) {
      console.log(error, "from admin contacts page");
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `https://educode-backend-six.vercel.app/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Deleted successfully");
        getContactsData();
      } else {
        toast.error(`Delete failed: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1 className="admin-contacts-title">Admin Contact Data</h1>
        <div className="admin-contacts-grid">
          {contactData.map((contact, index) => (
            <div className="admin-contact-card" key={index}>
              <p className="admin-contact-username">
                Username: {contact.username}
              </p>
              <p className="admin-contact-email">Email: {contact.email}</p>
              <p className="admin-contact-message">
                Message: {contact.message}
              </p>
              <button
                className="admin-contact-btn"
                onClick={() => deleteContact(contact._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
