
riot.tag2('boa2-tag', '<p class="num">{num}</p> <form> <input placeholder="Enter any number" ref="one2" type="number"> <input placeholder="Enter any number" ref="two2" type="number"> <button type="submit" onclick="{getSum}">Check Subtraction!</button> </form>', '', '', function(opts) {
    this.getSum = function(e) {
        e.preventDefault();
        let arg1 = this.refs.one2.value;
        let arg2 = this.refs.two2.value;
        this.doSomething(arg1, arg2);
    }.bind(this)

    this.doSomething = function(arg1, arg2) {
        this.update({num: +arg1 - +arg2});
    }.bind(this)
});