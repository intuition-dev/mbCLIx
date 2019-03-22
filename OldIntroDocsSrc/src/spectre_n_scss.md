## Spectre SCSS Theme Framework and SCSS

### Spectre

The default SCSS theme framework used in most examples is [Spectre CSS](https://picturepan2.github.io/spectre/getting-started.html#introduction). Spectre is small (~10KB) but fully featured and easy to use. Spectre does not use JavaScript, which makes it [AMP-compatible](https://www.ampproject.org/learn/overview/) - a big plus for content-driven sites and apps.

### SCSS

SCSS is the same as css, but what's more is that in scss there are supports nested elements, eg(from spectre _accordions.scss):

        .accordion-header {
            display: block;
            padding: $unit-1 $unit-2;

            .icon {
                transition: transform .25s;
            }
        }

Also in scss there are available variables, as you can see from the previous example `$unit-1 $unit-2`, and mixins — the parts of scss code that can be reused in other scss files or properties.

The main scss differences from usual css are:

- nested elements
- variables
- mixins

### assets.yaml

In our project we use mbake scss compiler, it works through assets.yaml eg:
- https://github.com/metabake/MetaBake-Docs/tree/master/meta-website/assets

There is list of sass files in assets.yaml and it will compile to /assets/css folder. So you can just run the command from the 'assets' folder to compile scss/sass to css:

        $ mbakeX -s . 

or any path in assets or any sub folder under assets and it will compile scss/sass to css. It won't work for folders other than /assets, or if there is no assets.yaml properly configured in assets.

You can also use mbake live reload/watcher/compiler from the root folder of your project, this command will automatically compile scss/sass to css as well as `.pug` to `.html`, and `*-comp.pug` to `*-comp.js`. The command is:

        $ mbakeX -w .


In the [next tutorial](/dynamic_data_binding/), we cover _dynamic databinding_.

Learn more about SCSS ans SASS [here](https://sass-lang.com)

NEXT: Go to [dynamic databinding](/dynamic_data_binding/).