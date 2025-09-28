import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaBreadSlice, FaHorseHead } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { AdminNav } from "../AdminNav";
import "../../style/adminUser.css";
export const AdminLayout = () => {

  const { user, isLoading } = useAuth();

  if (isLoading) {
    return;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div>
        <AdminNav />
        <div style={{ padding: "1rem" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
