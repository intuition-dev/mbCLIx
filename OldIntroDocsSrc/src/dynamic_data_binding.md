## Learn serverless websites with dynamic databinding.

A webapp is just a dynamic website. This tutorial helps you understand an example of a serverless website. Whether you plan to build a webapp or not, this tutorial is a good foundation. 

In this tutorial we cover these key concepts: appshell, includes, routes, custom tags, link lists, content lists, dependency management and serverless email. This includes dynamic databinding, where the browser ('client') uses data from a JSON response to dynamically render content _client-side_.

We assume that you have already installed the example `website` project as described [here](/pug_static_data/); generated with `$ mbake -s` and running on S3. 

### Steps

1. The example website uses an _appshell_ for the parts of a website that are common to all pages. To understand how this works using Pug, inspect `/zabout/about/index.pug` and `/get-started/index.pug`. These Pug files show how the parts of the HTML they have in common are pulled from central places. Both pages use or 'extend' the _template_ `/layout/layout.pug`. Open this template file, and see that it has 'blocks' named `'head2'`, and `'main'`. The Pug pages that extend this template define how to replace (or 'fill') these blocks. Each page defines that the `'main'` block consists of a page-specific content.

2. The website also makes use of Pug _include_. Looking at `/zabout/contact/index.pug` you see that the `'main'` block includes _fragment_ `email.pug` for the email form. We also can re-use `email.pug` anywhere else on page or in other pages. Now inspect `/zabout/about/index.html`. This is the complete HTML which mbake has collated together from template, fragments and dat.yaml. Since S3 returns the 'default' page `index.html` when the browser requests `/zabout/about/`, this is what the end user sees. 

3. Application routes are defined with `a href` tags. Inspect `/layout/navJBar.pug` for examples. When a user clicks on a link, the URL in the browser changes and the respective content, such as `/landing/why/index.html` is returned. Users can bookmark individual URLs. The browser maintains a navigation history so that using its 'Back' button yields the expected result.

4. We use [Riot.js](https://riot.js.org/) for custom tags. We use it when we need a new component or want to hide functions and vars. To learn how Riot components are written and used in Pug, inspect `/riotFirst/comps/first-comp.pug`. It looks something like this:

        first-comp
            p Dynamic Data:
            p { num }

            script.
                doSomething(arg) {
                    console.info('arg: ', arg)
                    this.update({num: arg})
                }


    When `'doSomething()'` gets called, it updates the `{num}`.

    You would run `'$ mbake -c .'` to generate a `first-comp.js` file to include in your page. mbake looks for files that end in `'-comp.pug'`.

    `/riotFirst/index.pug` uses this component and looks like this:

        head
            title #{title}
        body
            //- include Riot
            script(src='//cdn.jsdelivr.net/npm/riot@3.11.2/riot.min.js')
            //- include the component script
            script(src='tags/first-comp.min.js')
            p
            div
                //- use the tag
                first-comp
            script.
                var firstcomponent = riot.mount('first-comp')[0] // get the tag
                firstTag.doSomething(42) // call the logic

    You can see it working by going to `/riotFirst/` in the browser.

5. We can render a list of links from a `list.json`. Navigate to the 'News' menu item. Inspect `/news/index.pug`. We use _Axios_ to load the JSON and our custom riot component `table-comp` to dynamically render the list of links in the browser. Note that we begin loading the JSON as early as possible, in parallel with the UI, so users have to wait less. Now inspect `/news/tag/table-comp.pug` and note the use of Pug `each={items}` with JavaScript to iterate through the items in `list.json`. You use `'$ mbake -c .'` to generate `table-comp.js`. It is incorporated in `/news/index.pug`. There's no need to write JSON by hand, as you can process a `list.csv` to `list.json` with `'$ mbakeX -j .'`. This is a great way to build lists that change over time.

7. Inspect `/assets/js/loader.js`. We use a tiny [dependency manager](https://github.com/muicss/johnnydepp) (862 bytes) to facilitate the loading of required libraries in parallel with the UI. Take another look at `/zabout/contect/email.pug` and the use of `depp.require(['css'], setupEmail)`. We use it to signal when an inline dependency has been met (a process is 'done' and code is 'ready' for execution).

8. Finally, we use [EmailJS](http://www.emailjs.com/) to send email from the `/zabout/contact` page without any server code.

Another feature of mbake allows you to generate an _AMP_ version of a website that has no custom JavaScript. More about this in another upcoming tutorial.

__Summary__: in this tutorial, you've learned about appshell, includes, routes, custom tags, link lists, content lists and serverless email, along with dynamic data binding. In the [next tutorial](/crud/), we cover a _serverless CRUD webapp_.

NEXT: Go to [Generate a serverless CRUD webapp](/crud/).

