# DevOps

So serverless means no (or few) back end developers and now Front End devs do DevOps. 

# Using

Load in a closure, assume they are not 100% uptime.

Most should be loaded last, favor UX load times. For example after DOM plus 100ms.

Don't have devOps code in random places. 
 You can load a fragment via Pug flag in Production only, not local or dev. To avoid site rebuild, check an Env.json file and if PROD load.
(Fragment should be called devOps.pug, included before headFrag).

# Bronze Level

## Site (Marketing)

This is only used for websites, not webapps.

People often ask for Google Analytics. That is for full time marketing analysts only: whose jobs is full time use of it. 
It is to be avoided.

- http://simpleanalytics.io seems best

- http://clicky.com seems OK, but has EU issues.


## Waterfall

- http://gtmetrix.com


## Emulators (ie11 and older iOS)

Of course everyone tests locally on IE 11, FF, iOS, Safari, Android, etc.

- Browserstack account lets you supplement above


## Errors

- http://sentry.io

- Errorception is also very nice but a bit smaller.

Both?

### QUnit

If you have a ViewModel layer, you should test user going across pages by 'opening' VideModel in sequence. Also, it improves code to make VM testable.

#### This does not avoid need for QA resource and should only be used to supplement a Product side's QA resource.

Unit testing services layer, View or regular Model(not VM) has much less benefits.


# Silver Level

## RUM, Synthetic transaction and Page/Screen Loads (pings)

These are 3 different things, but same vendor provides all 3:

- http://monitis.com

Also: 
- 

## Capacity / Preventive 1

Take a single ViewModel and QUnit script. The script will try to stress.
Then open the QUnit test in a few browsers. So you triple the stress.


# Gold Level

## Capacity / Preventive 2

External browser load generators. Rather than you writing your 

- LoadImpact is awesome. You may need to modify your code so it can be used.

- But RUM, Synthetic transaction and Page/Screen Loads vendors provide load generators.

# Native/Hybrid WebApps

A subset is used on deviceready: Errors and RUM.



