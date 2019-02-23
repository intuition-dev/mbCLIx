## Guidelines as to when to use Tag/Components

**RULE**: Must use Contexted DOM selector|query (check RIOT Guide for jq and w/o jq)

```html
// Contexted jQuery
$('p', this.root)

// Contexted Query Selector
this.root.querySelectorAll('p')
```
It is not the best practice to have an event on the dom, eg: `button(onclick='{this.handleClick}') button text` in html attribute, instead it's better register and event to a dom like this:

```js
$('button', this.root).click(function() {...});
```
It is a good practice to use the life cycle event mount, eg:

```js
this.on('mount', function() {...});
```
and use `this.update()`, eg:
```js
this.on('mount', function() { // right after the component is mounted on the page
    let THIZ = this; // this is the tag
    .
    .
    .
    THIZ.update({num: +arg1 - +arg2});
});
```

A component is architected so it is easy for the page to use - even if it is hard to write the tag.

Other:
- Main point of page/screen should be pug/include, not a component - so it's easy to see what a page does
- But there are things around the main thing supporting it. Those could be tags. If:
    - There is some .js that we can hide in the tag
    - Could host the tag.js outside of the web app, think:  banner ad. Encapsulation! 
- Normally each tag, when mounted on the page, is passed the ViewModel. Binding is inside the tag.  eg: options
- component does update() (using virtual DOM as is current fad)
- When possible make component as much attribute or dom based. eg yield, and again ... attributes over .js
- CSS style could be scoped -  Scoped CSS :scope
- Could be used in another webapps. eg: contact us.
- There could be multiple instance of a component on a page.
- Leverage component lifecycle events (eg mount) as needed.
- Avoid component mixins. 
- Should be able to work external
- Should change based on html component attributes. Use attributes when you can.

- component should not reference or affect other things on a page. It is one way communication from page. If anything: component broadcasts events
 


## Riot2 

The <yield> component is a special riot core feature that allows you to inject and compile the content of any custom component inside its template in runtime.

In this example `html` which is passed to a `tag` from `index.pug` specified under the `boa-tag` component (two form inputs):

```html
boa-tag(type='sum', text='Check Sum!')
    input(type='number', placeholder='Enter any number')
    input(type='number', placeholder='Enter any number')
```

And this `html` in compiled output will be inserted exactly in the place where the `<yield/>` html component is specified in a riot tag:

```html
boa-tag

    form
        <yield />
        .h-row
            button(type='submit') {opts.text}
            p.num { num }
```

**NOTE**

There might be a bug/issue with addressing to a function through html component attribute from a page to a tag, so instead of this:

```html
button(onclick='{toggle}') Text
```

you might need to escape `{}` brackets from removing in compiled html, like this:

```html
button(onclick='!{"{toggle}"}') Text
```


For more information learn more about Riot.js, pug and Yield:

* [Learn dynamic binding with Riot.js in 90 seconds](https://medium.com/@uptimevic/learn-riot-js-dynamic-binding-in-90-seconds-fcece5237c67)
* [Riot.js Yield](http://tutorials.jenkov.com/riotjs/yield.html)
* [Riot.js Guide](https://riot.js.org/guide/)