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
import MenuItem from "@material-ui/core/MenuItem";

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
  const classes = useStyles();
  // moved this up to use it in the payload for get event
  const id = Number(props.match.params.id);
  const dispatch = props.dispatch;
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

  const onHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onHandleClose = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const filteredEvent = props.store.event.eventReducer.filter((request) => {
    return request.id === id;
  });
  return (
    <div>
      {filteredEvent.map((details) => {
        return (
          <div>
            <CssBaseline>
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={onHandleClick}
                >
                  Assign
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={onHandleClose}
                >
                  <MenuItem onClick={onHandleClose}>Amanda</MenuItem>
                  <MenuItem onClick={onHandleClose}>Ashley</MenuItem>
                  <MenuItem onClick={onHandleClose}>Karen</MenuItem>
                  <MenuItem onClick={onHandleClose}>John</MenuItem>
                </Menu>
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
                  <MenuItem onClick={handleClose}>Request Received</MenuItem>
                  <MenuItem onClick={handleClose}>Contacted</MenuItem>
                  <MenuItem onClick={handleClose}>Assignment</MenuItem>
                  <MenuItem onClick={handleClose}>Scheduled</MenuItem>
                  <MenuItem onClick={handleClose}>Missed Connections</MenuItem>
                </Menu>
              </div>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom
                    key={details.id}
                  >
                    Event Details:
                  </Typography>
                  <Typography className={classes.pos}>
                    Event Information:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Date Received:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Program:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Request Date and Time:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Location:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Name of Organization:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Number of Students:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Number of Chaperones:
                  </Typography>
                  <Typography className={classes.pos} component="p">
                    Contact Information:
                    <br />
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Full Name:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Phone Number:
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Email Address:
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Select
              value="Assign"
              onChange={this.assign}
              options={users}
              className="selector_container"
            /> */}
                  <Button>Edit</Button>
                  <Button>Contacted</Button>
                </CardActions>
              </Card>
            </CssBaseline>
          </div>
        );
      })}
    </div>
  );
}

export default connect(mapStoreToProps)(EventDetailsPage);
