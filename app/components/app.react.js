/** @jsx React.DOM */
(function() {
"use strict";
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var React = require('react/addons');
require('react.backbone');

var NavigationSection = require('./navigationsection.react');


var App = React.createBackboneClass({

    componentDidMount: function () {
            var Router = Backbone.Router.extend({
                routes: {
                    '': 'all',
                    'active': 'active',
                    'completed': 'completed'
                },
                all: this.setState.bind(this, {
                    nowShowing: app.ALL_TODOS
                }),
                active: this.setState.bind(this, {
                    nowShowing: app.ACTIVE_TODOS
                }),
                completed: this.setState.bind(this, {
                    nowShowing: app.COMPLETED_TODOS
                })
            });

            new Router();
            Backbone.history.start({pushState: true});
        },
    render: function() {
        return <div className="mag-app">
        <NavigationSection/>
        <div className="app-page">
        {this.props.page}
        </div>
        </div>;
    }
});

module.exports = App;

}());