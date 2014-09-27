/** @jsx React.DOM */
/*var App = require('./components').App;
var Frontpage = require('./components').Frontpage;
var React = require('react');
require('react.backbone');
var Backbone = require('backbone');

var page = <Frontpage/>;

React.renderComponent(<App page={page}/>, document.getElementById("app"));
*/
var BaseApp = require('rendr/shared/app');

module.exports = BaseApp.extend({
  // @client
  start: function() {
    // Show a loading indicator when the app is fetching.
    this.router.on('action:start', function() { this.set({loading: true});  }, this);
    this.router.on('action:end',   function() { this.set({loading: false}); }, this);

    // Call 'super'.
    BaseApp.prototype.start.call(this);
  }

});

$(document).foundation();

function applyHash() {
    var hash = window.location.hash;
    if(hash === "#grid") {
        $('body').addClass("grid");
    } else {
        $('body').removeClass("grid");
    }
}

window.addEventListener("hashchange", applyHash, false);

$(document).ready(function() {
    applyHash();
});