
riot.tag2('liz-flipcard', '<div class="cardwrap {flipx:flipx,flipy:flipy,backflip:backflip,back45:back45}"><yield></yield></div>', '', '', function(opts) {
    this.flipx = false;
    this.flipy = false;

    thiz = this

    this.on('mount', function() {
      var _ref;
      if (!this.root.style.width) {
        this.root.style.width = "100px";
      }
      if (!this.root.style.height) {
        this.root.style.height = "100px";
      }
      this.root.style.display = "block";
      if ((_ref = opts.direction) != null ? _ref.match(/[xy]{2}/) : void 0) {
        thiz.back45 = true;
      }
      if (opts.direction === "y") {
        thiz.backflip = true;
      }

      [].slice.call(this.root.querySelectorAll('.front,.back,.cardwrap')).forEach((function(thiz) {
        return function(elem) {
          elem.style.width = thiz.root.offsetWidth + "px";
          elem.style.height = thiz.root.offsetHeight + "px";
        };
      })(this));

      this.update();
    });

    this.toggle = function() {
        var _ref, _ref1;
        if (opts.direction !== "y" || ((_ref = opts.direction) != null ? _ref.match(/x/) : void 0)) {
          this.flipx = !this.flipx;
        }
        if ((_ref1 = opts.direction) != null ? _ref1.match(/y/) : void 0) {
          this.flipy = !this.flipy;
        }
        return this.update();
    }.bind(this)

    this.front = function () {
        var _ref, _ref1;
        if (opts.direction !== "y" || ((_ref = opts.direction) != null ? _ref.match(/x/) : void 0)) {
          this.flipx = false;
        }
        if ((_ref1 = opts.direction) != null ? _ref1.match(/y/) : void 0) {
          this.flipy = false;
        }
        return this.update();
    }.bind(this)

    this.back = function() {
        var _ref, _ref1;
        if (opts.direction !== "y" || ((_ref = opts.direction) != null ? _ref.match(/x/) : void 0)) {
          this.flipx = true;
        }
        if ((_ref1 = opts.direction) != null ? _ref1.match(/y/) : void 0) {
          this.flipy = true;
        }
        return this.update();

    }.bind(this)
});