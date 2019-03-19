# Social SEO

SEO stands for Search Engine Optimization.
Including social media metadata in all new pieces of content allows you to optimize for sharing Twitter, Facebook, Google+ and Pinerest by defining exactly how titles, descriptions, images and more appear in social streams.

The implications for SEO are also significant. The right data, including optimized images, helps content to spread, which often leads to increased links and mentions. You can find many templates of SEO meta tags in the internet (eg: [here](https://moz.com/blog/meta-data-templates-123))

In mbake you can write values for each meta tag and for each page in the page's dat.yaml file and then in the layout address to these fields in meta tags. This allows you to define meta tags just once (in the layout) amd then access to them on each page from dat.yaml file.

You can inspect code in the example blog app:

        $ mbake -b

in the `/layout/layout.pug` file you can see defined SEO meta tags in `head`:

        meta(name='description', content=content_text)

        //- Schema.org markup for Google+
        meta(itemprop='name', content=title)
        meta(itemprop='description', content=content_text)
        meta(itemprop='image', content=image)

        //- Twitter Card data
        meta(name='twitter:title', content=title)
        meta(name='twitter:description', content=content_text)
        meta(name='twitter:image', content=image)

        //- Open Graph data
        meta(property='og:title', content=title)
        meta(property='og:image', content=image)
        meta(property='og:description', content=comment)

Notice that instead of their value (text or url) there are variables.
Now open `/blog/post-*/dat.yaml`, here you can see that the variables from the layout's `head` are defined here with their value as text or url, eg:

        title: >-
        Quisque faucibus lacinia turpis id fermentum. Sed eu velit massa. Etiam
        molestie, ante at imperdiet ornare, sapien nulla volutpat nunc.
        image: >-
        https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAOd1CI4oPfTryZpo_rAyZXf9ltuPAvRv45XPGDghPSLii5We
        content_text: >-
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem
        ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod

The values of this variables will be placed in html head SEO meta tags at the compiled time, in html when you will compile `index.pug` to `index.html`

In the [next tutorial ](/amp/) you will learn about AMP.
NEXT: Go to [AMP](/amp/).