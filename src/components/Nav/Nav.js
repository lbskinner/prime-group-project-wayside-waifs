import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import Modal from "@material-ui/core/Modal";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import logoImage from "../../images/nav_logo3.png";
import LoginPageModal from "../LoginPage/LoginPageModal";
import { useLocation } from "react-router-dom";

const Nav = (props) => {
  // check the current url which is on location.pathname
  let location = useLocation();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          {/* if the url is not the request page, show the request event link */}
          {location.pathname !== "/request" && (
            <Link className="nav-link" to="/request">
              Request Event
            </Link>
          )}
          {/* Show the link to the events page, report page and the logout button if the user is logged in */}
          {props.store.user.id ? (
            <>
              <Link className="nav-link" to="/event">
                Events
              </Link>
              <Link className="nav-link" to="/reports">
                Reports
              </Link>
              <LogOutButton className="nav-link" />
            </>
          ) : (
            <button className="nav-link" onClick={handleOpen}>
              Login
            </button>
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
