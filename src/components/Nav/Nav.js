import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import logoImage from "../../images/nav_logo3.png";

const Nav = (props) => {
  let loginLinkData = {
    path: "/login",
    text: "Login",
  };

  if (props.store.user.id != null) {
    loginLinkData.path = "/event";
    loginLinkData.text = "Home";
  }

  return (
    <div>
      <div className="nav">
        <a
          target="_black"
          href="https://secure.waysidewaifs.org/site/SPageServer/?pagename=Home_new"
        >
          <img src={logoImage} alt className="nav-logo" />
        </a>
        {/* <Link to="/home">
        <h2 className="nav-title">Wayside Waifs Humane Education </h2>
      </Link> */}

        <div className="nav-right">
          <Link className="nav-link" to="/request">
            Request Event
          </Link>
          <Link className="nav-link" to={loginLinkData.path}>
            {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
            {loginLinkData.text}
          </Link>
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {props.store.user.id && (
            <>
              <Link className="nav-link" to="/reports">
                Reports
              </Link>
              <LogOutButton className="nav-link" />
            </>
          )}
          {/* Always show this link since the about page is not protected */}
          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
      </div>
      {/* <div className="img-container">
        <a
          target="_black"
          href="https://secure.waysidewaifs.org/site/SPageServer/?pagename=Home_new"
        >
          <img src={logoImage} alt className="nav-logo" />
        </a>
      </div> */}
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
