/**
 * Sidebar.jsx
 * This component creates the sidebar, which contains:
 * - Layers List
 * - Legend
 */
import React from 'react';
import { Col } from 'react-bootstrap';

import LayerList from './LayerList';
import Legend from './Legend';

class Sidebar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            activeTab: "LayerList"
        };
        this.onTabClick = this.onTabClick.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }
    onTabClick (e) {
        let clickedTab = e.target.getAttribute("value");
        if(typeof clickedTab === "string") {
            this.setState({
                activeTab: clickedTab
            });
        }
    }
    getClassName (tabValue) {
        if(this.state.activeTab === tabValue) {
            return "active";
        }
        return "";
    }
    render () {
        let content = [];
        if(this.state.activeTab === "LayerList") {
            content.push(<LayerList key="layers" />);
        } else {
            content.push(<Legend key="legend" />);
        }
        let props = {
            xsHidden: true,
            sm: 5,
            md: 4,
            lg: 3
        }
        if(this.props.sidebarOpen === false) {
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
                        <div className={this.getClassName("LayerList")}
                            role="button"
                            tabIndex={-1}
                            onClick={this.onTabClick}
                            value="LayerList">
                            <i className="fa fa-map"> </i>
                        </div>
                        <div className={this.getClassName("Legend")}
                            onClick={this.onTabClick}
                            role="button"
                            tabIndex={-1}
                            value="Legend">
                            <i className="fa fa-key"> </i>
                        </div>
                    </div>
                    <div className="wiscviewer-sidebar-tab-content">
                        {content}
                    </div>
                </div>
            </Col>
        );
    };
};

export default Sidebar;