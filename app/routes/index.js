var Router = require('express').Router;

var router = Router();
router.get('/', function (req, res, next) {
    res.render('frontpage');
});

var publishRouter = Router();
publishRouter.get('/write', function(req, res, next) {
    res.render('pages/write', {});
});
router.use('/publish', publishRouter);

var postRouter = Router();
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

var authorRouter = Router();
authorRouter.get('/:name', function (req, res, next) {
    res.render('pages/author');
});

router.use('/author', authorRouter);

module.exports = router;