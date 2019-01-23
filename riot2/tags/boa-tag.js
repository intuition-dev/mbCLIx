
riot.tag2('boa-tag', '<p class="num">{num}</p> <form> <input placeholder="Enter any number" type="number"> <input placeholder="Enter any number" type="number"> </form><yield></yield>', '', '', function(opts) {

    this.getSum = function(e) {
        e.preventDefault();
        let arg1 = $('input:first-of-type', this.root).val();
        let arg2 = $('input:last-of-type', this.root).val();
        this.doSomething(arg1, arg2);
    }.bind(this)
    this.doSomething = function(arg1, arg2) {
        this.update({num: +arg1+ +arg2});
    }.bind(this)

    this.getSub = function(e) {
        e.preventDefault();
        let arg1 = $('input:first-of-type', this.root).val();
        let arg2 = $('input:last-of-type', this.root).val();
        this.doSomething2(arg1, arg2);
    }.bind(this)
    this.doSomething2 = function(arg1, arg2) {
        this.update({num: +arg1 - +arg2});
    }.bind(this)
});