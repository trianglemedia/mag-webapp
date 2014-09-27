(function () {
    'use strict';

    var Backbone = require('backbone');

    var Post = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        }
    });

    var Posts = Backbone.Collection.extend({
        model: Post
    });

    module.exports = {
        Post: Post,
        Posts: Posts
    };
}());