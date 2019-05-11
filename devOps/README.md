# DevOps

So serverless means no (or few) back end developers and now Front End devs do DevOps. 

# Using
Load devops scripts in a closure, assume they are not 100% uptime.

Most should be loaded last, favor UX load times. For example after DOM plus 100ms.

Don't have devOps code in random places. 
 You can load a fragment via Pug flag in Production only, not local or dev:
 
 ```
   mbakeX --bakeWP .
 ```
 Fragment should be called devOps.pug, included before headFrag.

# Levels of DevOps

# Bronze LEVEL


## Waterfall

- http://gtmetrix.com


## Emulators (ie11 and older iOS)

Of course everyone tests locally on IE 11, FF, iOS, Safari, Android, etc.

- Browserstack account: to test IE 11, iOS and such.


## Pings

- RUM vendors

## Site tracking (Marketing)

This is only used for websites, not webapps.

People often ask for Google Analytics. That is for full time marketing analysts only: whose jobs is full time use of it. 
It is to be avoided.

- http://simpleanalytics.io seems best

- http://clicky.com seems OK, but may have EU user notification issues.


# Silver LEVEL

## Errors

- http://sentry.io

- Errorception is also very nice but a bit smaller.

Maybe use both.

### QUnit

If you have a ViewModel layer, you should test user going across pages by 'opening' VideModel in sequence. Also, it improves code to make VM testable.

#### This does not avoid need for QA resource and should only be used to supplement a Product side's QA resource.

Testing services layer ot View has much less benefits.


## RUM and Page/Screen Loads 

These are 3 different things, but same vendor provides all 3, and waterfall:

- http://monitis.com They do recording on FireFox

Also: 
- http://uptrends.com Step script
- http://site24x7.com Native app recorder

- Uptime status page


# Gold LEVEL

## Capacity / Preventive 2

External browser load generators. Rather than you writing your 

- LoadImpact is awesome. You may need to modify your code so it can be used.

- But RUM, Synthetic transaction and Page/Screen Loads vendors provide load generators.

##  Native/Hybrid WebApps

Errors and RUM.

- Testing APIs

## Capacity / Preventive 1

** ViewModel and QUnit script. The script will try to stress.
Then open the QUnit test in a few browsers. So you triple the stress.

#### CDN
- Also get CDN traffic samples via API


# Platinum LEVEL

- Synthetic transaction, provided by RUM vendors



