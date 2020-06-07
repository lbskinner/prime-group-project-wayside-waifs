import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
// import LoginPage from "../LoginPage/LoginPage";
// import LoginPage from "../LoginPage/LoginPageModal";
import RegisterPage from "../RegisterPage/RegisterPage";
import ReportPage from "../ReportPage/ReportPage";
import RequestForm from "../RequestForm/RequestForm";
import EventPage from "../EventPage/EventPage";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"; // for custom theme
import "./App.css";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#AC0040",
    },
    // secondary: "",
    // error: "",
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/home" component={RequestForm} />
              <Route exact path="/request" component={RequestForm} />
              <Route exact path="/eventDetails" component={EventDetailsPage} />
              <Route exact path="/login" component={RequestForm} />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute exact path="/admin" component={UserPage} />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute exact path="/info" component={InfoPage} />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}

              {/* <ProtectedRoute
                exact
                path="/request"
                authRedirect="/event"
                component={RequestForm}
              /> */}
              <ProtectedRoute
                exact
                path="/registration"
                component={RegisterPage}
              />

              <ProtectedRoute exact path="/reports" component={ReportPage} />
              {/* <ProtectedRoute exact path="/request" component={RequestForm} /> */}
              <ProtectedRoute exact path="/event" component={EventPage} />
              <ProtectedRoute
                exact
                path="/details"
                component={EventDetailsPage}
              />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
