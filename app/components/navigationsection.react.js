/** @jsx React.DOM */
(function() {
"use strict";
var React = require('react/addons');


var NavigationSection = React.createClass({
    render: function() {
        return <div className="contain-to-grid sticky navigation">
            <nav className="top-bar" data-topbar role="navigation" data-options="sticky_on: large">
                <h1 className="brand">triangle</h1>
            </nav>
        </div>;
    }
});

module.exports = NavigationSection;

}());