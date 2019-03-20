# AMP

The Accelerated Mobile Pages (AMP) is an open-source library that provides a straightforward way to create web pages that are compelling, smooth, and load near instantaneously for users. Web pages and ads published in the AMP open-source format load near instantly, giving users a smooth, more engaging experience on mobile and desktop.

When a standard webpage has an AMP counterpart, a link to the AMP page is placed in an HTML tag in the source code of the standard page. Because most AMP pages are easily discoverable by web crawlers, third parties such as search engines and other referring websites can choose to link to the AMP version of a webpage instead of the standard version.

AMP HTML is entirely built on existing web technologies. It achieves reliable performance by restricting some parts of HTML, CSS and JavaScript. To make up for those limitations AMP HTML defines a set of custom elements for rich content beyond basic HTML.

To learn what's necessary to create a valid AMP HTML page inspect code in blog app (downloaded in the [previous tutorial](/seo/)). Open file `/layout/layout.pug`, it is the layout for regular pages, here in `head` you can see the link to the AMP page:

        link(rel='amphtml', href='m.html')

With this link and the link to regular page in amp-page `head` this pages are linked to each other, so search engines know that this page has an amp version. Then open `/layout/layout-m.pug` file, it is the layout for amp-pages.

This line tells that this is an AMP page:
        
        html('⚡')

Next lines in `head`.
The charset definition must be the first child of the `head` tag:

        meta(charset='utf-8')

The AMP runtime must be loaded as the second child of the `head` tag:

        script(async, src='https://cdn.ampproject.org/v0.js')

then goes a canonical link pointing to the regular HTML, as well required for an AMP page. (If no HTML version exists, it should point to itself):

        link(rel='canonical', href='index.html')

AMP page require a viewport declaration. It's recommended to include initial-scale=1:

        meta(name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover")

CSS must be embedded inline. In mbake we use include feature for css, we define css in the separate file, but in the compiled html output css will still be inline:

        include ../shared/css.pug

If you'll open file `shared/css.pug` you can see that styles wrapped in `style(amp-custom='').`
AMP HTML documents must contain the following boilerplate in their `head` tag:

        style(amp-boilerplate='').
            body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}

In `body` tag almost all regular html tags are supported except for certain tags, such as the `img` tag, are replaced with equivalent or slightly enhanced custom AMP HTML tags, eg: `blog/blog/post-*/layout-single-m.pug`:

        amp-img.img__inside(alt='...', src='who.jpg', width='300', height='300')

You can test your AMP page on validation errors online here:

        https://search.google.com/test/amp

or directly in browser by adding this string to the end of your page's url:

        /m.html#development=1

open browser's console and it will show you whether the page has validation errors or validation is successful.

In the [next tutorial ](/tags/) you will learn about Components.
NEXT: Go to [Components](/tags/).