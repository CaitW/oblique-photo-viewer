/**
 * AboutButton.jsx
 * Link to the About page
 */
import React from "react"

const AboutButton = () => (
  <li
    role="presentation"
    className="wiscviewer-nav-tool wiscviewer-nav-tool-about"
  >
    <a href="about.html" rel="noopener noreferrer" target="_blank">
      <i className="fa fa-info-circle wiscviewer-nav-tool-icon" />
    </a>
  </li>
)

export default AboutButton
