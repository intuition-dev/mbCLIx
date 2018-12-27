I'm Liz, I took old [flipcard](https://github.com/crisward/riot-flipcard) and updated it and cleaned up the code.

## Install

Download and unpack or git clone

## Run

* From the root folder:
  ```
  mbake -t . && mbake .
  ```

## Usage

Use tag with the attributes in your `*.pug`:

```pug
flipcard(direction='y', style='width:315px;height:100px;display:none')
  .front
    h2 Flip Vertical
    button(onclick='{toggle}') Flip
  .back(style='background:#a40')
    h2 I'm Flipped
    button(onclick='{toggle}') Back
```

You can access any method from `*-tag.pug` in your `*.pug` file via curly braces, like this:

```pug
.button(onclick='{toggle}')
```

As well as element's attributes, you define them in `*.pug`:

```pug
flipcard(direction='y')
```
and then they are used in `*-tag.pug`.