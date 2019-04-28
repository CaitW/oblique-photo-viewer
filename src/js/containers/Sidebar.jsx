/**
 * Sidebar.jsx
 * This component creates the sidebar, which contains:
 * - Layers List
 * - Legend
 */
import React from "react"
import PropTypes from "prop-types"
import { Col } from "react-bootstrap"

import LayerList from "./LayerList"
import Legend from "./Legend"

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    /**
     * @type {object} state
     * @property {string} activeTab - the ID of the active tab
     *  - "LayerList"
     *  - "Legend"
     */
    this.state = {
      activeTab: "LayerList"
    }
    this.onTabClick = this.onTabClick.bind(this)
    this.getClassName = this.getClassName.bind(this)
  }
  /**
   * Called when a tab is clicked. Sets state to the value of the clicked tab.
   * @param {SyntheticEvent} e
   */
  onTabClick(e) {
    const clickedTab = e.target.getAttribute("value")
    if (typeof clickedTab === "string") {
      this.setState({
        activeTab: clickedTab
      })
    }
  }
  /**
   * Return a classname for active vs inactive tabs
   * @param {string} tabValue - check tab value against currently active tab
   * @returns {string} - returns "active" if tab is active, or empty string
   */
  getClassName(tabValue) {
    if (this.state.activeTab === tabValue) {
      return "active"
    }
    return ""
  }
  render() {
    const content = []
    if (this.state.activeTab === "LayerList") {
      content.push(<LayerList key="layers" />)
    } else {
      content.push(<Legend key="legend" />)
    }
    let props = {
      xsHidden: true,
      sm: 5,
      md: 4,
      lg: 3
    }
    if (this.props.sidebarOpen === false) {
      props = {
        lgHidden: true,
        mdHidden: true,
        smHidden: true,
        xsHidden: true
      }
    }
    return (
      <Col {...props} className="wiscviewer-sidebar">
        <div className="wiscviewer-sidebar-inner-container">
          <div className="wiscviewer-sidebar-tabs">
            <div
              className={this.getClassName("LayerList")}
              role="button"
              tabIndex={-1}
              onClick={this.onTabClick}
              value="LayerList"
            >
              <i className="fa fa-map" />
            </div>
            <div
              className={this.getClassName("Legend")}
              onClick={this.onTabClick}
              role="button"
              tabIndex={-1}
              value="Legend"
            >
              <i className="fa fa-key" />
            </div>
          </div>
          <div className="wiscviewer-sidebar-tab-content">{content}</div>
        </div>
      </Col>
    )
  }
}

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired
}

export default Sidebar
