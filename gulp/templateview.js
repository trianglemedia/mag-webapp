module.exports = {
    typekit_id: "pon8lyp",
    imageRoot: "/images/",
    image: function () {
        return function (text, render) {
            return "/images/" + render(text);
        };
    }
};