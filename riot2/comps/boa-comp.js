
riot.tag2('boa-comp', '<form><yield></yield> <div class="h-row"> <button type="submit">{opts.text}</button> <p class="num">{num}</p> </div> </form>', '', '', function(opts) {
      this.on('mount', function() {
          let THIZ = this
          $('button', this.root).click(function(evt) {

             evt.preventDefault()
             let type = opts.type;
             if (type === 'sum') {

                let arg1 = $('input:first-of-type', THIZ.root).val()
                let arg2 = $('input:last-of-type', THIZ.root).val()

                THIZ.update({num: +arg1+ +arg2});
             } else {

                let arg1 = $('input:first-of-type', THIZ.root).val()
                let arg2 = $('input:last-of-type', THIZ.root).val()

                THIZ.update({num: +arg1 - +arg2})
             }
          })
    })
});