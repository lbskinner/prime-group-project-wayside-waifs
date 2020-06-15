import React, { useEffect } from "react";
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

  useEffect(() => {
    if (props.store.user.id) {
      handleClose();
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="nav-background">
      <div className="nav">
        <a
          className="nav-container-logo"
          target="_black"
          href="https://secure.waysidewaifs.org/site/SPageServer/?pagename=Home_new"
        >
          <img src={logoImage} alt="" className="nav-logo" />
        </a>

        <div className="nav-right">
          <Link className="nav-link" to="/request">
            Request Event
          </Link>
          {/* )} */}
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
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="modalContent">
          <LoginPageModal handleCloseModal={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
