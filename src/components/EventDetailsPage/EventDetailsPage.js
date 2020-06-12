import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
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
});
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
function EventDetailsPage(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignEl, setAssignEl] = useState(null);
  const { classes } = props;
  // moved this up to use it in the payload for get event
  const id = Number(props.match.params.id);
  const dispatch = props.dispatch;

  function editHandleClick(event) {
    props.history.push(`/edit/${props.match.params.id}`);
  }
  useEffect(() => {
    dispatch({ type: "GET_EVENT_DETAILS", payload: id });
  }, [id, dispatch]);

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
    setAssignEl(event.currentTarget);
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
      <div key={event.id} style={{ margin: 15 }}>
        <CssBaseline>
          <div>

//             <Paper classes={{ root: classes.root }} elevation={1}>
//               <Typography
//                 classes={{ root: classes.padding }}
//                 variant="h4"
//                 gutterBottom
//               >
//                 {event.organization} Event Details:{" "}
//               </Typography>
//             </Paper>
//             <Box display="flex" justifyContent="center" m={1} p={1}>
//               <div style={{ margin: 15 }}>
//                 <Button
//                   color="secondary"
//                   variant="contained"
//                   aria-controls="simple-menu"
//                   aria-haspopup="true"
//                   onClick={onHandleClick}
//                 >
//                   Assign
//                 </Button>
//                 <Menu
//                   id="simple-menu"
//                   anchorEl={assignEl}
//                   keepMounted
//                   open={Boolean(assignEl)}
//                   onClose={onHandleClose}
//                 >
//                   <MenuItem onClick={onHandleClose}>Amanda</MenuItem>
//                   <MenuItem onClick={onHandleClose}>Ashley</MenuItem>
//                   <MenuItem onClick={onHandleClose}>Karen</MenuItem>
//                   <MenuItem onClick={onHandleClose}>John</MenuItem>
//                 </Menu>
//               </div>
//               <div style={{ margin: 15 }}>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   aria-controls="simple-menu"
//                   aria-haspopup="true"
//                   onClick={handleClick}
//                 >
//                   Set Status
//                 </Button>
//                 <Menu
//                   id="simple-menu"
//                   anchorEl={anchorEl}
//                   keepMounted
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem onClick={handleClose}>Request Received</MenuItem>
//                   <MenuItem onClick={handleClose}>Contacted</MenuItem>
//                   <MenuItem onClick={handleClose}>Assignment</MenuItem>
//                   <MenuItem onClick={handleClose}>Scheduled</MenuItem>
//                   <MenuItem onClick={handleClose}>Missed Connections</MenuItem>
//                 </Menu>
//               </div>
//             </Box>
//             <Paper classes={{ root: classes.root }} elevation={1}>
//               <div className={classes.padding}>
//                 <Typography variant="h6" className={classes.pos}>
//                   Event Information:
//                 </Typography>
//                 <Typography variant="body2">
//                   Date Received: {event.request_date}

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

              <Typography variant="h5" color="textSecondary" gutterBottom>
                {event.organization} Details:
              </Typography>

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

              <Grid>
                <Typography className={classes.pos}>
                  Event Information
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Date Received:{" "}
                  {moment(event.request_date).format("MM-DD-YYYY")}

                </Typography>
                <Typography variant="body2">
                  Program: {event.program}
                </Typography>

                <Typography color="textSecondary" variant="body2">
                  Requested Date and Time:{" "}
                  {moment(event.program_date).format("MM-DD-YYYY")} at{" "}

                  {event.time_of_day}
                </Typography>
                <Typography variant="body2">
                  Location: {event.location}
                </Typography>
                <Typography variant="body2">
                  Name of Organization: {event.organization}
                </Typography>
                <Typography variant="body2">
                  Grade Level: {event.grade_level}
                </Typography>
                <Typography variant="body2">
                  Number of Students: {event.student_number}
                </Typography>
                <Typography variant="body2">
                  Number of Chaperones: {event.adult_sponsors}
                </Typography>

              </div>
            </Paper>

            <Paper classes={{ root: classes.root }} elevation={1}>
              <div className={classes.padding}>
                <Typography className={classes.pos} variant="h6">
                  Contact Information


                  <br />
                </Typography>
                <Typography variant="body2">
                  Full Name: {event.contact_first_name}{" "}
                  {event.contact_last_name}
                </Typography>
                <Typography variant="body2">
                  Phone Number: {event.contact_phone_number}
                </Typography>
                <Typography variant="body2">
                  Email Address: {event.contact_email}
                </Typography>
              </div>
            </Paper>

            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
              <Button
                color="secondary"
                variant="contained"
                onClick={editHandleClick}
              >
                Edit
              </Button>
            </Box>
          </div>
        </CssBaseline>
      </div>
    );
  });
  return <div>{eventMap}</div>;
}
export default withStyles(styles)(connect(mapStoreToProps)(EventDetailsPage));
