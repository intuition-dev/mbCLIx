
riot.tag2('boa-tag', '<form><yield></yield> <div class="h-row"> <button type="submit" onclick="{this.handleClick}">{opts.text}</button> <p class="num">{num}</p> </div> </form>', '', '', function(opts) {
    this.on('before-mount', function() {
        this.handleClick = function(e) {
            e.preventDefault();

            let type = opts.type;
            if (type === 'sum') {

                let arg1 = $('input:first-of-type', this.root).val();
                let arg2 = $('input:last-of-type', this.root).val();

                this.update({num: +arg1+ +arg2});
            } else {

                let arg1 = $('input:first-of-type', this.root).val();
                let arg2 = $('input:last-of-type', this.root).val();

                this.update({num: +arg1 - +arg2});
            }
        }.bind(this)
    });
});