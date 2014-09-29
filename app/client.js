var components = require('./views');

window.React = require('react');

window.components = {};
for(var i in components) {
    if(components.hasOwnProperty(i)) {
        window.components[i] = components[i];
    }
}