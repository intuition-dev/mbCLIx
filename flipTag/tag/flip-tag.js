
riot.tag2('liz-flipcard', '<div class="cardwrap {flipx:flipx,flipy:flipy,backflip:backflip,back45:back45}"><yield></yield></div>', '', '', function(opts) {
    (function() {
      this.flipx = false;

      this.flipy = false;

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
          this.back45 = true;
        }
        if (opts.direction === "y") {
          this.backflip = true;
        }
        [].slice.call(this.root.querySelectorAll('.front,.back,.cardwrap')).forEach((function(_this) {
          return function(elem) {
            elem.style.width = _this.root.offsetWidth + "px";
            return elem.style.height = _this.root.offsetHeight + "px";
          };
        })(this));
        return this.update();
      });

      this.toggle = (function(_this) {
        return function() {
          var _ref, _ref1;
          if (opts.direction !== "y" || ((_ref = opts.direction) != null ? _ref.match(/x/) : void 0)) {
            _this.flipx = !_this.flipx;
          }
          if ((_ref1 = opts.direction) != null ? _ref1.match(/y/) : void 0) {
            _this.flipy = !_this.flipy;
          }
          return _this.update();
        };
      })(this);

      this.front = (function(_this) {
        return function() {
          var _ref, _ref1;
          if (opts.direction !== "y" || ((_ref = opts.direction) != null ? _ref.match(/x/) : void 0)) {
            _this.flipx = false;
          }
          if ((_ref1 = opts.direction) != null ? _ref1.match(/y/) : void 0) {
            _this.flipy = false;
          }
          return _this.update();
        };
      })(this);

      this.back = (function(_this) {
        return function() {
          var _ref, _ref1;
          if (opts.direction !== "y" || ((_ref = opts.direction) != null ? _ref.match(/x/) : void 0)) {
            _this.flipx = true;
          }
          if ((_ref1 = opts.direction) != null ? _ref1.match(/y/) : void 0) {
            _this.flipy = true;
          }
          return _this.update();
        };
      })(this);

    }).call(this);
});