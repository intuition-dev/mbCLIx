# Caddy Config with webDAV and Mountain Duck mount

1. Setup up an enviroment in the cloud, e.g. [Digital Ocean](www.digitalocean.com).

1. Setup a Web IDE account, e.g. [CodeAnywhere](http://codeanywhere.com).

errors ../err1
        }

1. Create folder `www` and in this folder download CMS source:

        $ mkdir www
        $ cd www 
        $ mbake -b 

        compile files:

        $ mbake -c .
        $ cd assets
        $ mbakeX -s .
        $ cd ..
        $ cd CMS
        $ mbake -i .


1. Create an account on [CDN77](http://www.cdn77.com/) if you don't already have one.

1. Go to [CDN 77](http://client.cdn77.com) and create a `Resource` for your remote environment hosting: select `My Origin`, select `http` and in the `domain` field type in the your ip address and port.

1. Go to tab `other settings` and select `cache expiry` -- `10 minutes`, then go to `Purge` tab and `purge all files`. This action is needed to reduce the time of files caching.

1. To verify that the mount is working, you can edit some file and check if changes applied in the browser via the Endpoint URL from your recently created CDN Resource.

__Summary__: With Cloud hosting and mount, you can edit apps from your filesystem and see the edits reflected on the web without extra deployment work.


In the [next tutorial ](/webdav_linux_mount/) you will learn how to mount webDAV on linux.
NEXT: Go to [Mount webDAV on linux](/webdav_linux_mount/).