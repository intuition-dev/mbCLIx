# Components

## FlipTag

[Here](https://github.com/metabake/MetaCake-plugins-2/tree/master/docs/items/flip) you can check the example of an advanced `FlipTag` component.

Download and unpack or git clone [the project](https://github.com/metabake/MetaCake-plugins-2/tree/master/docs/items/flip).

From the root (`/flip`) folder, compile `.pug`:

        mbakeW -c .

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

[Here](https://github.com/metabake/mBake-Advanced4/tree/master/riot2) is another example of an advanced `riot2` component.

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

And the component will do all calculation, depending only on this parameters that are being passed. Ideally even not a programmer can use it. It is a next level of productivity, since components are more productive.

In the [next tutorial ](/cms/) you will learn about CMS.
NEXT: Go to [Editor CMS](/cms/).