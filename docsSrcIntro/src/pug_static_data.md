
## Learn Templating/Pug and static binding; view via S3 HTTP server.

Simply said, _Pug_ is HTML without closing tags. Pug is a templating language, more powerful than [Markdown](https://en.wikipedia.org/wiki/Markdown). If you know Node/Express, you know Pug already.

If you know HTML, you also mostly know Pug: just don't close the tags. Pug also has variables (e.g. `#{key1}`) and imports (e.g. `include fragment.pug`).

This Pug:

    header
    body
        p Hello #{key1}


with `key1:World` (from `dat.yaml` in our case)
becomes this HTML:

    <header></header>
    <body>
        <p> Hello World</p>
    </body>

Pug is more concise, more powerful and easier to read and write than HTML. With Pug, you can also change the layout of your app; which is hard to do in Markdown. Because Markdown is useful for integrating larger bodies of text into HTML, mbake also supports `include:metaMD mytext.md` in Pug.

We see Pug as a declarative 4th generation language (4GL). As we went from second generation assembly language (2GL) to higher level third generation (3GL, like C, C#, Java and JavaScript), our productivity jumped. Pug 4GL gets you to yet higher levels of productivity. 

### Steps

We assume that you have already installed mbake with `$ yarn global add mbake` as described [here](/#how-to-install-mbake).

1. Watch [Do you even Jade bro](http://youtube.com/watch?v=wzAWI9h3q18) as an intro about Pug (it used to be called Jade).

2. In your `/www` mounted from DO linux box to your local PC or to another Linux machine in CA created in this tutorial: [Tutorial 1](/s3_n_webdrive_mount/) generate a sample website with the command (it will download and extract the source code of a sample website app):

        $ mbake -s

      Open this as a project in your favorite code editor (we like VS Code).
      
1. `-s` command will download `/website` folder to `/www`. Copy all files from `/www/website` folder to the `/www` folder and remove `/www/website` folder.

3. Compile the project:

        // from the root of project to compile `.pug` to `.html`
        $ mbake -c .

        // from `/assets` folder to compile sass/scss to css
        $ mbakeX -s .

        // from `/news` folder and any other folder (if they exist) in which there is `dat_i.yaml` to process Pug and dat_i items to items.json:

        $ mbake -i .

        The last `mbake -i .` command will create `.json` file in the folder where `dat_i.yaml` is placed.
        The `.json` file will be generated from `dat.yaml` file's fields.
        In the `dat_i.yaml` file you can check from which folder mbake will look for `dat.yaml` files' fields from which the object in `itmes.json` will be generated:



4. View the app in a browser. Use the linux machine ip with port as browser app URL from [Tutorial 1](/s3_n_webdrive_mount/), eg: http://104.248.180.143:8080. For production, we use CDN URL configured on the linux machine ip (that you've done in the first tutorial).

5. On the website, navigate to the `/zabout/about/` page. In your code editor, go to the `/zabout/about/` folder, edit `dat.yaml` and change `'About Us'` to `'About Me'`, save, then `$ mbake .` and refresh the browser. Of course you could also change something in `index.pug`.

6. You can also use mbake live reload/watcher/compiler from the root folder of your project, this command will automatically compile `.pug` to `.html` and `*-comp.pug` to `*-comp.js`, and also scss/sass to css:

        $ mbakeX -w .

## About dat.yaml
mbake looks for `dat.yaml` in each folder and uses it for static binding. If you have `'bla: Oh hi'` in `dat.yaml`, you can use the value inside a `.pug` file at compile time via:

    #{bla}

That will put`'Oh hi'`, the value of `bla` at compile time, into the HTML. This is especially useful for any SEO items that can be repetitive in the HTML source.

__Summary__: In this tutorial, you learnt about Pug and static data binding. In the [next tutorial](/spectre_n_scss/), we cover _spectre css framework and scss_.

NEXT: Go to [Spectre SCSS Theme Framework and SCSS](/spectre_n_scss/).