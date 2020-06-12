import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Grid from "@material-ui/core/Grid";

const moment = require("moment");

// import Select from "react-select";
// const users = this.props.store.allUser;
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
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
  const handleClose = () => {
    setAnchorEl(null);
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
            <Button
              aria-controls="simple-select"
              aria-haspopup="true"
              onClick={onHandleClick}
            >
              Assign
            </Button>
            <Select
              id="simple-select"
              anchorEl={assignEl}
              keepMounted
              options={userList}
              open={Boolean(assignEl)}
              onSelect={onHandleClose}
            ></Select>
          </div>

          <div>
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
              <MenuItem onClick={handleClose} value="Received">
                Request Received
              </MenuItem>
              <MenuItem onClick={handleClose} value="Contacted">
                Contacted
              </MenuItem>
              <MenuItem onClick={handleClose} value="Assigned">
                Assigned
              </MenuItem>
              <MenuItem onClick={handleClose} value="Scheduled">
                Scheduled
              </MenuItem>
              <MenuItem onClick={handleClose} value="Complete">
                Complete
              </MenuItem>
              <MenuItem onClick={handleClose} value="Missed">
                Missed Connections
              </MenuItem>
            </Menu>
          </div>

          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                Event Details
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {event.organization}
              </Typography>

              <Grid>
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
                <br />
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
              </Grid>
            </CardContent>
            <CardActions>
              <Button onClick={editHandleClick}>Edit</Button>
            </CardActions>
          </Card>
        </CssBaseline>
      </div>
    );
  });
  return <div>{eventMap}</div>;
}
export default connect(mapStoreToProps)(EventDetailsPage);
