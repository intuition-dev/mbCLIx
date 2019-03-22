# Blog website

1. With the command you can download a blog website example:

        $ mbake -b

`-b` is blog. It also works for any items, not just articles.

1. In blog, copy folder /blog/post-1 to /blog/blog, rename it to `post-1n`. Edit some of the content, like the .md file so it's different.

1. Then in /blog run
        $ mbake -i .

That creates a new items.json file.

1. Now view the home page in browser: the new item shows up! The home page does a ajax fetch of the json and shows it. Via a pagination library. Check out the component in /blog/blog/components that is the items loop.

1. You should know now how to add any items and show the list of items. When someone adds a new item (via a new folder) it shows up after
        $ mbake -i .

1. Notice how everything in `/blog/blog/post-*/dat.yaml` ends up in `/blog` `items.json`.

That is used in the list. So dat.yaml can show on page, as you learnt from previous tutorials. And can show in list - as above described how to make items.json. That list can then be used by a component 'iterator'.