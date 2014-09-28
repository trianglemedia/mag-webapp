var router = require('express').Router();
router.get('/', function (req, res, next) {
    res.render('frontpage');
});

var postRouter = require('express').Router();
postRouter.get('/:slug', function (req, res, next) {
    res.render('pages/post', {
        post: {
            title: "Cara Delevigne Does Modeling Shit",
            category: "Fashion",
            author: {
                name: "Clementine",
                avatar: "clementine.jpg"
            },
            image: "cara.jpg"
        }
    });
});

router.use('/post', postRouter);

var authorRouter = require('express').Router();
authorRouter.get('/:name', function (req, res, next) {
    res.render('pages/author');
});

router.use('/author', authorRouter);

module.exports = router;