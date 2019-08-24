
# Relative performance of Webpack vs modern lazy loading w/JAMstack approaches, and future of 'import'

1

![10% ](us.png)

* 
2

<img src="in.png" width="400"/>


## How to measure perforamnce:
Performance is important - and more important for mobile users where they have limited bandwidth of how much can be loaded at once.
I am surprised by how many programmers are not levering the built into browsers tools: the network tab. The browsers developer tools network tab will show you the performance of your application that the end user on a mobile device would have. To often programmers use their own experience on their development machine.

## Champion:
We developers have been using Webpack for about 5-10 years, we used it to replace <script src="main.js"></script> all over the place. 
IMO, Webpack approach is getting long on the tooth. Even when you try to mimic lazy load with Webpack you are much slower than apps using modern approaches.

## Challenger:
JAMstack is a newer approach to developing, among other things leveraging edge/CDN. (One benefit of JAMstack: the https handshake that takes 4-6 round 
trips is at the edge, and much closer to each end user; thus improving performance of each connection. Also, edge is much cheaper than origin - faster and cheaper works for me). For lazy loading dependencies I use depp.require(), from a tool released just last year ( https://github.com/muicss/johnnydepp/releases ).

Sample runtime code:

depp.define({
	'a': 'https://jsdeliver.com/libs/a.js'
	'b': '/b.js'
})
depp.require('a', function() {
	// we can do A
	depp.require('b', function() {
		// we can do B
	})
})

You can see how tightly we can control what gets loaded when. So now that we can control loading, how should we maximite the performance of the 'first meaningful paint'(FML)?

## Comparison:


## Future of 'import' 

Best practice


### Can we have today use the future functionality of import? YES!




## Recommendation:

As a manager you need to look at the app in the Developer Tools network Tab.
And when you check the app on mobile: Don't use WiFi. 
If you monitor the little things, the big things will take care of themselves. 

## Recipe:
There are two things we need: data loading and ui loading. They are loaded in parallel, but we'll look at them one at a time.

UI-loading:

1. For UI, you want to in head load the smallest CSS: that does the layout and will avoid layout jank.
Leave the fonts out, since: the fonts have not loaded yet! 
Most popular CSS framework is BootStrap, here is what topCss would look like:
- https://github.com/intuition-dev/toolBelt/blob/master/bootStrap/scss/bootstrapTop.scss
Notice I comment out as much as I can so resulting CSS is small.

2. I sometimes start loading a background image in head - using a lib like 'load-image'. Alternative is that browser finishes ~100ms worth or work, and then starts
loading the background image. I save 100ms by starting the load now.

3. Also in head you need to load the spinner - in my case the spinner is built into BootStrap. I can show it if needed.
And that's it, we can go to the body!
Since JAMstack is static - the screen content is already at the edge. Also from SEO POV, SEO is graded on performance so we get a nice SEO score boost.
The body load should be very quick and we have our first FML.  (And I have not loaded fonts yet, font glyphs are quite large)

4. If I'm using a component library or need poly fills - I load that in head. 

5. So in the body now. I don't need to say that you should optimize each image for performance. (I use a node script to CLI process images, check my git project for more).
And that images should be lazy loaded, eg; using lazysizes.

6. Now you load fonts, but use a webfontloader so you are notified that font is loaded. This is one of the many ways to avoid FOUT. 

7. Now you can load your real full css, each element now looks nicer and fonts look nicer. The head css just made it OK and removed, but now it looks nicer. As opposed to FML, this is now enhanced. Since loading is in parallel a regular end user would only notice that the page loads fast.

8. Now you can load any 3rd party libs, like analytics, or marketing or ads, etc. They all want to be in script in head to make their products look good. Forget it, I'm not
loading their stuff before I even loaded my fonts. 

9. Now you can load DOM libs and interaction libs. There are no interactions that a user can do while page is still rendering. So don't load any of it ahead of FML.
That is for UI-loading.

Data-loading:

1. At the same time UI assets are loading, I'm loading things so I can do my fetch( or Ajax)
It is important to start the fetch in head!
The data can be in flight when you get out of head, but the request must be in head.
So what ever you need to do get the non-ui requests for data in flight in head: do it.

No need to data binding in head, but the request must be in flight before body starts loading. 
You have to look at the network tab to get that to happen ASAP.

2. In body, you need to wait on two events:
a) your data is back
b) the ui is ready
Once both are done you can bind/show the data.
So you see how you need to optimize both, ui-loading and data-loading to insure user experiences high performance.


















