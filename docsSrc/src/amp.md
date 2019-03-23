# AMP

The Accelerated Mobile Pages (AMP) — is an open-source library that provides a straightforward way to create web pages that are compelling, smooth, and load near instantaneously for users. Web pages and ads published in the AMP open-source format load near instantly, giving users a smooth, more engaging experience on mobile and desktop.

When a standard webpage has an AMP counterpart, a link to the AMP page is placed in an HTML tag in the source code of the standard page. Because most AMP pages are easily discoverable by web crawlers, third parties such as search engines and other referring websites can choose to link to the AMP version of a webpage instead of the standard version.

AMP HTML is entirely built on existing web technologies. It achieves reliable performance by restricting some parts of HTML, CSS and JavaScript. To make up for those limitations AMP HTML defines a set of custom elements for rich content beyond basic HTML.

AMP is useful for SEO and has two benefits for it. One is it will have a `Fast` label designation on search engine results pages, and the other is that it will be a ranking factor. 

## AMP page example

### Head

To learn what's necessary to create a valid AMP HTML page inspect code in blog app (`$ mbake -b`, downloaded in the [previous tutorial](/seo/)). Open file `/layout/layout.pug`, it is the layout for regular pages, here in `head` you can see the link to the AMP page:

        link(rel='amphtml', href='m.html')

With this link and the link to regular page in amp-page `head` this pages are linked to each other, so search engines know that this page has an amp version. Then open `/layout/layout-m.pug` file, it is the layout for amp-pages.

This line tells that this is an AMP page:
        
        html('⚡')

Next lines in `head`.
The charset definition must be the first child of the `head` tag:

        meta(charset='utf-8')

The AMP runtime must be loaded as the second child of the `head` tag:

        script(async, src='//cdn.ampproject.org/v0.js')

then goes a canonical link pointing to the regular HTML, as well required for an AMP page. (If no HTML version exists, it should point to itself):

        link(rel='canonical', href='index.html')

AMP page require a viewport declaration. It's recommended to include initial-scale=1:

        meta(name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover")

CSS must be embedded inline. In mbake we use include feature for css, we define css in the separate file, but in the compiled html output css will still be inline:

        include ../shared/css.pug

If you'll open file `shared/css.pug` you can see that styles wrapped in `style(amp-custom='').` it is also required. As for css properties itself there are also some restrictions, for example in amp page version styles can't be used `!important` is will give a validation error, and the inline style sheet has to be a maximum size of 50 kilobytes, if more it will also give a validation error.

Check for more rules on css for AMP pages [here](http://www.ampproject.org/docs/design/responsive/style_pages). 

AMP HTML documents must contain the following boilerplate in their `head` tag:

        style(amp-boilerplate='').
            body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}

### Custom scripts in the AMP pages

Note that no custom script is supported in the AMP page. The whole point of AMP is to only allow a subset of web technologies to stop your page being slow.

Javascript is often the cause of slow websites and so AMP pages do not allow them (except for the AMP scripts themselves), though they've tried to fill in the gap this leaves with amp components which are specially written to not be slow.

### Body

In `body` tag almost all regular html tags are supported except for certain tags, such as the `img` tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags, eg: `blog/blog/post-*/layout-single-m.pug`:

        amp-img.img__inside(alt='...', src='who.jpg', width='300', height='300')

### AMP page validation

You can test your AMP page on validation errors online here, type in the unput field the page that is needed to be validated (note that you need to enter url to your AMP page, eg: `http://example/about/m.html`):

        http://search.google.com/test/amp

or you can validate AMP page directly in browser by adding this string to the end of your page's url, eg:

        http://example/about/m.html#development=1

If you're validating page in browser, open browser's console and it will show you whether the page has validation errors or validation is successful. Or if you're validating AMP page through [search.google.com](http://search.google.com/test/amp) it will show you the results of validation under the input field on the same page.

In the [next tutorial ](/tags/) you will learn about Components.
NEXT: Go to [Components](/tags/).