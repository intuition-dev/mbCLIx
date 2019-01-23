
riot.tag2('boa-tag', '<p class="num">{num}</p> <form> <input placeholder="Enter any number" ref="one" type="number"> <input placeholder="Enter any number" ref="two" type="number"> <button type="submit" onclick="{getSum}">Check sum!</button> </form><yield></yield>', '', '', function(opts) {
    this.getSum = function(e) {
        e.preventDefault();
        let arg1 = this.refs.one.value;
        let arg2 = this.refs.two.value;
        this.doSomething(arg1, arg2);
    }.bind(this)

    this.doSomething = function(arg1, arg2) {
        this.update({num: +arg1+ +arg2});
    }.bind(this)
});