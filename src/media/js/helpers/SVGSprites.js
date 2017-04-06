function SVGSprites() {
    this.$container = $('<div></div>').prependTo(document.body);
    var self = this;

    $.get('media/svg/sprite.svg', function (data) {
        self.$container.append(typeof XMLSerializer != 'undefined'
             ? (new XMLSerializer()).serializeToString(data.documentElement)
             : $(data.documentElement).html());
    });
}

SVGSprites.prototype = {
    addToContainer: function (html) {
        return $(html).appendTo(this.$container);
    },
};

module.exports = new SVGSprites();
