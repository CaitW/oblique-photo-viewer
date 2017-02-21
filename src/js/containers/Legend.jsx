import React from 'react';

export default class Legend extends React.Component {
    constructor() {
        super();
        this.state = {
        	panelVisible: true
        }
        this.onPanelClick = this.onPanelClick.bind(this);
    }
    onPanelClick() {
        let self = this;
        let newState = Object.assign({}, self.state);
        newState.panelVisible = !newState.panelVisible
        this.setState(newState);
    }
    render() {
        let bodyClassNames = ["panel-body"];
        let headerClassNames = ["panel-heading"];
        let iconClassNames = ["fa"];
        if (this.state.panelVisible === false) {
            bodyClassNames.push("hidden");
            iconClassNames.push("fa-plus");
        } else {
            headerClassNames.push("active");
            iconClassNames.push("fa-chevron-up");
        }
        return (
        	<div className="panel panel-default">
	            <div className={headerClassNames.join(" ")} onClick={this.onPanelClick}>Legend<i className={iconClassNames.join(" ")}></i></div>
	            <div className={bodyClassNames.join(" ")}>
	            	Legend
	            </div>
	        </div>
	    );
    }
}
