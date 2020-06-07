import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import Modal from "@material-ui/core/Modal";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import logoImage from "../../images/nav_logo3.png";
import LoginPageModal from "../LoginPage/LoginPageModal";

const Nav = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let loginLinkData = {
    path: "/login",
    text: "Login",
  };

  if (props.store.user.id != null) {
    loginLinkData.path = "/event";
    loginLinkData.text = "Event";
  }

  return (
    <div>
      <div className="nav">
        <a
          target="_black"
          href="https://secure.waysidewaifs.org/site/SPageServer/?pagename=Home_new"
        >
          <img src={logoImage} alt="" className="nav-logo" />
        </a>
        {/* <Link to="/home">
        <h2 className="nav-title">Wayside Waifs Humane Education </h2>
      </Link> */}

        <div className="nav-right">
          <Link className="nav-link" to="/request">
            Request Event
          </Link>
          <button className="nav-link" onClick={handleOpen}>
            Login Modal
          </button>
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
      <Modal open={open} onClose={handleClose}>
        <div className="modalContent">
          <LoginPageModal handleCloseModal={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
