/** @jsx React.DOM */
(function() {
"use strict";
var React = require('react/addons');

var PostList = require('./postlist.react');

var Frontpage = React.createClass({
    render: function() {
        var posts = [
            {
                title: "Cara Delevigne Does Modeling Shit",
                synopsis: "Apparently she's an actress now too.",
                category: "Fashion",
                author: { 
                    name: "Clementine",
                    avatar: "clementine.jpg"
                },
                image: "cara.jpg"
            }, {
                title: "Herlo, Everybody",
                synopsis: "An interview with the always lovely (and incredibly fashionable) Clementine.",
                image: "clementine.jpg",
                category: "Celebrities",
                author: { name: "Cara", avatar: "cara.jpg" },
                properNouns: ["clementine"]
            }, {
                title: "Hur-Lo, This is Scout Speaking",
                synopsis: "We talk to Scout about life, love, airplanes, and hyperbusiness.",
                category: "Business",
                author: { name: "Scout", avatar: "scout.jpg" },
                image: "scout.jpg"
            }
        ];
        return <div className="frontpage">
            <PostList posts={posts}/>
        </div>;
    }
});

module.exports = Frontpage;

}());