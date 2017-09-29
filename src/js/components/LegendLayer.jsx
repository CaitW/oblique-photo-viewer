/**
 * LegendLayer
 * Container element for one layer's style(s)
 */
import React from 'react';
import PropTypes from 'prop-types';
import LegendStyle from './LegendStyle';

const LegendLayer = (props) => {
    const headerClassNames = ['panel-heading', 'wiscviewer-sidebar-panel-header'];
    const bodyClassNames = ['panel-body', 'pullDown', 'wiscviewer-sidebar-panel-body'];
    const styles = [];
    for (const style of props.layerStyles) {
        styles.push(
            <LegendStyle key={style.styleName}
                styleName={style.styleName}
                iconStyle={style.iconStyle}
                styleIconClassNames={style.styleIconClassNames}/>
        );
    }
    return (
        <div className="panel panel-default wiscviewer-sidebar-panel wiscviewer-legend-layer-group">
            <div className={headerClassNames.join(' ')}
                role="button"
                tabIndex={0}>
                <span className="wiscviewer-layer-name"> {props.layerName} </span>
                <span className="wiscviewer-layer-group-name"> {props.layerGroupName} </span>
            </div>
            <div className={bodyClassNames.join(' ')}>
                <ul className="wiscviewer-legend-list">
                    {styles}
                </ul>
            </div>
        </div>
    );
};

LegendLayer.propTypes = {
    layerGroupName: PropTypes.string.isRequired,
    layerName: PropTypes.string.isRequired,
    layerStyles: PropTypes.array.isRequired
};

export default LegendLayer;
