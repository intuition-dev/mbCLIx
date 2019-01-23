## Guidelines as to when to use Tag/Components

**RULE**: Must use Contexted DOM selector|query (check RIOT Guide for jq and w/o  jq)

   // Contexted jQuery
   $('p', this.root)

   // Contexted Query Selector
   this.root.querySelectorAll('p')


Other:
- Main point of page/screen should be pug/include, not a component - so it's easy to see what a page does
- But there are things around the main thing supporting it. Those could be tags. If:
    - There is some .js that we can hide in the tag
    - Could host the tag.js outside of the web app, think:  banner ad. Encapsulation! 
- Normally each tag, when mounted on the page, is passed the modelview. Binding is inside the tag.  eg: options
- Tag does update() (using virtual DOM as is current fad)
- When possible make tag as much attribute or dom based. eg yield, and again ... attributes over .js
- CSS style could be scoped -  Scoped CSS :scope
- Could be used in another webapps. eg: contact us.
- There could be multiple instance of a tag on a page.
- Leverage tag lifecycle events (eg mount) as needed.
- Avoid tag mixins. 

- Tag should not reference or affect other things on a page. It is one way communication from page. If anything: tag broadcasts events
 


## Riot2 

The <yield> tag is a special riot core feature that allows you to inject and compile the content of any custom tag inside its template in runtime.

In this example `html` which is passed to a `tag` from `index.pug` specified under the `boa-tag` tag (the `form`):

```html
boa-tag
    p Here is an example of 
        b <yield/> 
        | functionallity.
        br
        | This text is inside a tag.
```

And this `html` in compiled output will be inserted exactly in the place where the `<yield/>` tag is specified in a tag:

```html
    boa-tag

        p.num { num }
        .
        .
        .
        <yield />
```

For more information learn more about Riot.js, pug and Yield:

* [Learn dynamic binding with Riot.js in 90 seconds](https://medium.com/@uptimevic/learn-riot-js-dynamic-binding-in-90-seconds-fcece5237c67)
* [Riot.js Yield](http://tutorials.jenkov.com/riotjs/yield.html)
* [Riot.js Guide](https://riot.js.org/guide/)