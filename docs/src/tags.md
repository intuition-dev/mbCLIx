# Components

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
- Main point of page/screen should be pug/include - so it's easy to see what a page does
- But there are things around the main thing supporting it. Those could be components. If:
    - There is some .js that we can hide in the component
    - Could host the comp.js outside of the web app, think: banner ad. Encapsulation! 
- Normally each component, when mounted on the page, is passed to the ViewModel. Binding is inside the component.  eg: options
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

## FlipTag

[Here](http://github.com/MetaBake/MetaCake-plugins-2/tree/master/docs/items/flip) you can check the example of an advanced `FlipTag` component.

Download and unpack or git clone [the project](http://github.com/MetaBake/MetaCake-plugins-2/tree/master/docs/items/flip).

From the root (`/flip`) folder, compile `.pug`:

        mbakeX -c .

Use component with the attributes in your `index.pug`:

```pug
flipcard(direction='y', style='width:315px;height:100px;display:none')
  .front
    h2 Flip Vertical
    button(onclick='{toggle}') Flip
  .back(style='background:#a40')
    h2 I'm Flipped
    button(onclick='{toggle}') Back
```

You can access any method from `flip-comp.pug` in your `index.pug` file, eg:

```pug
.button(onclick='{toggle}')
```

As well as element's attributes, you define them also in `index.pug`:

```pug
flipcard(direction='y')
```
and then they are used in `flip-comp.pug`.


## riot2

[Here](http://github.com/MetaBake/mbake-Advanced4/tree/master/riot2) is another example of an advanced `riot2` component.

The `<yield>` component that is used here is a special riot core feature that allows you to inject and compile the content of any custom component inside its template in runtime.

In this example `html` which is passed to a `boa-comp.pug` component from `index.pug` specified under the `boa-comp` html-tag/component (two form inputs):

```html
boa-comp(type='sum', text='Check Sum!')
    input(type='number', placeholder='Enter any number')
    input(type='number', placeholder='Enter any number')
```

And this `html` in compiled html output will be inserted exactly in the place where the `<yield/>` html-tag/component is specified in a riot tag:

```html
boa-comp

    form
        <yield />
        .h-row
            button(type='submit') {opts.text}
            p.num { num }
```

The idea of this component is to use it, without knowing or investigating which code is written and how it works in `boa-comp.pug` component, but simply using it in your html by passing html parameters to it, eg:

    type='sum', text='Check Sum!'

And the component will do all calculation, depending only on this parameters that are being passed. Ideally even a non-programmer can use it. It is a next level of productivity, since components are more productive.

In the [next tutorial ](/cms/) you will learn about CMS.
NEXT: Go to [Editor CMS](/cms/).