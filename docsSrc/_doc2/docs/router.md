

# SPA-router - Pillar 7


SPA is easy!

This project includes a JavaScript router named _SPA-router_.

On navigating the app, the router only replaces content in the AppShell (`<div id='router'>`); this creates a 'rich client feel' and improves perceived performance. The router lets you have SPA events, which can be used for content transitions such as 'fade in' or 'fly left', that make your app indistinguishable from native Appstore apps.

If you don't like this router, MetaBake also supports Framework7, SmoothState or other similar SPA approaches.


The router and Hello World router is here:

 - [B-M-SPA/SPA/www/router](https://github.com/MetaBake/B-M-SPA/tree/master/router)



# Prerequisites for App Store

We use Adobe PhoneGap version 8+ for cross platform development with a single code base based on Pug. Apps are built using https://build.phonegap.com. Before going to the PhoneGap section you need to have an S3 web app, mounted locally, as explained in mbake section, and it needs to be SPA.

Before doing app store, make sure that you have mounted your web app to S3 and have copied the www folder to that mount. Then fix the CSS files in S3 (properties/metadata/Content-Type) to be text/css. The ROOT in each dat.yaml needs to point to the absolute path (ie: your http:// in the cloud) - use your IDE.the 'ROOT' step is important. Like this:
```
   # extract sample single-codebase PhoneGap app to a mounted S3 directory.
   mbake -s
   cd SPA/www
   # only www folder goes to S3 mount, config.xml is for a later step.

   # we will be running mobile, but we need to see what is going on. In a browser, go to http://console.re and configure your layout.pug

   # and build
   mbake .

   # now open your S3 webapp, whatever the S3 url is and make sure everything looks OK for mobile size and that console.re above is working.

   # now use your IDE to edit each dat.yaml. Change ROOT: '' to instead be the S3 URL from above.
   mbake .
   # Check that the web app is OK.

```
Notice that most of the work is regular web app development. If above works, we can now deploy; go to App Store (link on the left).

