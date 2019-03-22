<img src="https://metabake.github.io/MetaBake-Docs/logo.jpg" width="100">


# What is mbake?

mbake is a modern CLI static app generation tool. Apps and sites you generate with mbake are extreme serverless, allow user authentication and work with JSON and database APIs for dynamic databinding. You can use mbake for simple blogs or sites to the most complex web and mobile app projects.

If you don't have time, see [tl;dr](#tldr) at the bottom of this page.

mbake compares to other static generators and grunt/gulp; but it does a lot more with a lot less coding.

mbake is part of the MetaBake&trade; approach but can be used by itself.

## What is MetaBake?

MetaBake&trade; is a modern development approach that helps you deliver web apps 10X faster with less coding. MetaBake&trade; has 10 pillars.

Find out more about MetaBake:

- [Quick Demo](https://youtu.be/WyCdSFTUIvM)

- <a href='https://vimeo.com/282034037' target='_blank'>Meetup Video</a>

- [Summary for Managers](https://www.youtube.com/watch?v=OK-cJNSkQII)

MetaBake allows for gradual adoption. You can start by adopting just one or a few of its pillars. mbake is a good start.

MetaBake and mbake are open source. The source code is available at [github.com/MetaBake](https://github.com/MetaBake)

See [Resources](/res/) for related projects.

## How to install mbake

From a command line such as PowerShell, type:

```
   $ yarn global add mbake
```
That's it! If you don't have Yarn installed, first go [here](https://yarnpkg.com/lang/en/docs/install/#windows-stable).

## How to create a Hello World app with mbake

```
## Create index.pug
   header
   body
      p Hello #{key1}

## Create dat.yaml
   key1: World

## Generate index.html from Pug and Yaml:
   mbake .

   or: mbake subfoldername
```

## How to run an mbake app (such as Hello World)

mbake apps run on any static web server.
mbake has a watcher that triggers 'mbake' when you save a file, it also runs your app locally on `:8090` port:

```
   $ mbakeX -w .
```

Even though mbake apps are installed on a static server, they are dynamic because they allow user authentication and work with JSON for dynamic rendering and database APIs for dynamic databinding.

## How to generate a sample app with mbake

```
## Run mbake help to see the list of current sample apps
   mbake

## Generate sample app, e.g.
   mbake -u
```

## Other popular mbake commands

* `mbakeX -c .` - Convert Pug/Riot files to useable comp/js, e.g.: data binding.
* `mbake -i .` - Convert dat.yaml static files to JSON, for dynamic binding. More about this in B-M-SPA docs.

## How to see all mbake options

```
   $ mbake
   $ mbakeX
```

## How to make mbake apps serverless

To go extreme serverless, we show how to use mbake with

- Remote environment HTTP hosting (eg: Digital Ocean Linux)
- Mounting software so you can mount your site folder as a drive
- Google Firebase/Firestore 

### Go extreme serverless following the steps (Tutorials):

- [Learn Pug and static binding; view via S3 HTTP server](/pug_static_data/)
- [Spectre SCSS Theme Framework and SCSS](/spectre_n_scss/)
- [dynamic databinding](/dynamic_data_binding/)
- [Generate a serverless CRUD webapp](/crud/)
- [Simple CRUD example app and ViewModel+Bind](/model/)
- [Design](/design/)
- [Blog](/blog/)


Serverless/Cloud V2, Mount and Pug are some of the pillars of MetaBake.

## tl;dr

```
   $ yarn global add mbake
   $ mbake
   $ mbake -v
   $ cd ModelView
   $ mbake .
```

NEXT: Go to [Learn Pug and static binding; view via S3 HTTP server](/pug_static_data/).