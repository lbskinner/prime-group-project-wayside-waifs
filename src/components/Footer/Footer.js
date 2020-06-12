import React from "react";
import "./Footer.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <div className="footer-container">
      <p className="footer-text">
        2012-2018 Copyright Wayside Waifs, Inc. All rights reserved. WAYSIDE
        WAIFS and the Wayside Waifs logo are registered trademarks of Wayside
        Waifs, Inc. No portion of this work many be reproduced without express
        written permission of Wayside Waifs.
      </p>
    </div>
  </footer>
);

export default Footer;
