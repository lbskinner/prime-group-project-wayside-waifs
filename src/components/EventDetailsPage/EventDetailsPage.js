import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const moment = require("moment");

// import Select from "react-select";
// const users = this.props.store.allUser;
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  paperTransparent: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#fff0",
  },
  padding: {
    padding: "8px 20px",
  },
  selectorSize: {
    minWidth: 600,
  },
  inputMargin: {
    margin: "10px 0px",
    minWidth: 600,
  },
}));

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
function EventDetailsPage(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [assignEl, setAssignEl] = useState(null);
  const classes = useStyles();
  // moved this up to use it in the payload for get event
  const id = Number(props.match.params.id);
  const dispatch = props.dispatch;

  function editHandleClick(event) {
    props.history.push(`/edit/${props.match.params.id}`);
  }
  useEffect(() => {
    dispatch({ type: "GET_EVENT_DETAILS", payload: id });
  }, [id, dispatch]);
  // assign = (selectedOption) => {
  //   let submission = {
  //     user: selectedOption.value.id,
  //     event: this.props.event.id,
  //   };
  //   this.props.dispatch({
  //     type: "ASSIGN_EVENT",
  //     payload: submission,
  //   });
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event, status) => {
    setAnchorEl(null);
    let info = { status: status, id: props.match.params.id };
    props.dispatch({ type: "SET_STATUS", payload: info });
  };

  const onHandleClick = (event) => {
    setAssignEl(event.currentTarget);
  };
  const onHandleClose = (event) => {
    setAssignEl(null);
  };

  const users = props.store.allUser;
  let userList = [];
  if (props.store.allUser.length > 1) {
    for (let user of users) {
      userList.push({
        value: `${user.id}`,
        label: `${user.first_name}  ${user.last_name}`,
      });
    }
  }

  // const filteredEvent = props.store.event.details.filter((request) => {
  //   return request.id === id;
  // });
  // console.log(props);

  const eventMap = props.store.eventDetails.map((event) => {
    return (
      <div key={event.id}>
        <CssBaseline>
          <div>
            <Paper classes={{ root: classes.root }} elevation={1}>
              <Typography
                classes={{ root: classes.padding }}
                variant="h4"
                gutterBottom
              >
                {event.organization} Details:
              </Typography>
            </Paper>

            <Box display="flex" justifyContent="center" m={1} p={1}>
              <div style={{ margin: 15 }}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={onHandleClick}
                >
                  Assign
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={assignEl}
                  keepMounted
                  open={Boolean(assignEl)}
                  onClose={onHandleClose}
                >
                  {userList.map((userItem) => {
                    return (
                      <MenuItem
                        key={userItem.value}
                        onClick={(event) => handleClose(event, "Received")}
                      >
                        {userItem.label}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>

              <div style={{ margin: 15 }}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Set Status
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={(event) => handleClose(event, "Received")}>
                    Request Received
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => handleClose(event, "Contacted")}
                  >
                    Contacted
                  </MenuItem>
                  <MenuItem onClick={(event) => handleClose(event, "Assigned")}>
                    Assigned
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => handleClose(event, "Scheduled")}
                  >
                    Scheduled
                  </MenuItem>
                  <MenuItem onClick={(event) => handleClose(event, "Complete")}>
                    Complete
                  </MenuItem>
                  <MenuItem onClick={(event) => handleClose(event, "Missed")}>
                    Missed Connections
                  </MenuItem>
                </Menu>
              </div>
            </Box>

            <Paper classes={{ root: classes.root }} elevation={1}>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                Event Details
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {event.organization}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Request Date and Time:{" "}
                {moment(event.program_date).format("MM-DD-YYYY")} in the{" "}
                {event.time_of_day}
              </Typography>
            </Paper>
            <Paper classes={{ root: classes.root }} elevation={1}>
              <div className={classes.padding}>
                <Typography className={classes.pos}>
                  Event Information
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Date Received:{" "}
                  {moment(event.request_date).format("MM-DD-YYYY")}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Program: {event.program}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Requested Date and Time:{" "}
                  {moment(event.program_date).format("MM-DD-YYYY")} at{" "}
                  {event.time_of_day}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Location: {event.location}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Name of Organization: {event.organization}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Grade Level: {event.grade_level}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Number of Students: {event.student_number}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Number of Chaperones: {event.adult_sponsors}
                </Typography>
              </div>
            </Paper>

            <Paper classes={{ root: classes.root }} elevation={1}>
              <div className={classes.padding}>
                <Typography className={classes.pos} component="p">
                  Contact Information
                  <br />
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Full Name: {event.contact_first_name}{" "}
                  {event.contact_last_name}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Phone Number: {event.contact_phone_number}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Email Address: {event.contact_email}
                </Typography>
              </div>
            </Paper>

            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
              <Button onClick={editHandleClick}>Edit</Button>
            </Box>
          </div>
        </CssBaseline>
      </div>
    );
  });
  return <div>{eventMap}</div>;
}
export default connect(mapStoreToProps)(EventDetailsPage);
