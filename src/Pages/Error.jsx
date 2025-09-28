import { NavLink } from "react-router-dom"
import '../style/error.css'

export const Error = () => {
    return (
        <>
        <section id="error-page">
            <div className="content">
                <h2 className="header">404</h2>
                <h4> Sorry! page not found</h4>
                <p>The page you’re looking for doesn’t exist</p>

                <div className="btns">
                    <NavLink className={"primary-btnHome"} to="/"> return home</NavLink>
                <NavLink className={"secondary-btnReport"} to="/contact"> report problem</NavLink>
                </div>
            </div>
        </section>
        </>
    )
}
