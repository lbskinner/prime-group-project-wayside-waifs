import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// import Select from "react-select";
// const users = this.props.store.allUser;

const styles = (theme) => ({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
});

const options = [
  "Request Received",
  "Contacted",
  "Assigned",
  "Scheduled",
  "Complete",
  "Filed",
  "Missed Connections",
];

const ITEM_HEIGHT = 48;

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventDetailsPage extends Component {
  state = {
    heading: "Class Component",
  };

  assign = (selectedOption) => {
    let submission = {
      user: selectedOption.value.id,
      event: this.props.event.id,
    };
    this.props.dispatch({
      type: "ASSIGN_EVENT",
      payload: submission,
    });
  };

  render() {
    const classes = styles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <CssBaseline>
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h4" color="textSecondary" gutterBottom>
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
              <Button> Edit </Button>
              <Button> Contacted </Button>
            </CardActions>
          </Card>
        </CssBaseline>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(styles)(EventDetailsPage));
