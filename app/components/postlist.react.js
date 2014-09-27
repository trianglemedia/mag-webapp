/** @jsx React.DOM */
(function() {
"use strict";
var React = require('react/addons');
var Hypher = require('hypher');
var english = require('hyphenation.en-us');


var Preview = React.createClass({
    render: function() {
        return <div className="post-list">
            {
                this.props.posts.map(function(post) {
                    if(post.properNouns) {
                        english.exceptions = post.properNouns.join(",");
                    }
                    var hypher = new Hypher(english);
                    var id = post.title;
                    var key = "post-item-"+id;
                    var imageStyle = {
                        backgroundImage: "url('{{& imageRoot}}"+post.image+"')"
                    };
                    var avatarStyle = {
                        backgroundImage: "url('{{& imageRoot}}"+post.author.avatar+"')"
                    };
                    var synopsis = hypher.hyphenateText(post.synopsis);
                    return <div className="post-list-item" key={key}>
                        <div className="post-list-item-image" style={imageStyle}>
                            <span className="post-label">{post.category}</span>
                        </div>
                        <div className="post-list-item-body">
                        <h2 className="post-list-item-title">{post.title}</h2>
                        <div className="post-list-item-author">
                        <div className="post-list-item-author-avatar"><span style={avatarStyle}></span></div>
                        <span className="post-list-item-author-name"><a href="#">{post.author.name}</a></span>
                        <span className="post-list-item-author-time">2 hours ago</span>

                        </div>
                        <p>{synopsis}
                        </p>
                        </div>
                    </div>;
                })
            }
        </div>;
    }
});

module.exports = Preview;

}());