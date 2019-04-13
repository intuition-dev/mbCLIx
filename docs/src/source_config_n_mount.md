# Caddy Config with webDAV and Mountain Duck mount

1. Setup up an enviroment in the cloud, e.g. [Digital Ocean](www.digitalocean.com).

1. Setup a Web IDE account, e.g. [CodeAnywhere](http://codeanywhere.com).

1. Install yarn, mbake, typescript

1. Install Caddy with webDAV plugin, eg:

        $ curl https://getcaddy.com | bash -s personal http.webdav

1. Add `Caddyfile` to the root folder and config it, eg:

        :8080 {  #cdn would go to this 
            root /root/www
            gzip
            mime .css text/css
            # set user for the /webdav path
            basicauth /webdav admin 123123 
            webdav /webdav 
            
            log ../log1
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

1. Run Caddy server, from the root folder where Caddyfile is:
    
        $ caddy -conf Caddyfile 
        // or 
        $ caddy 
        // or (to leave caddy server running after you'll quit the terminal or close the CA tab)
        $ nohup caddy &

1. In browser open the url, change ip address to your ip address, the site should work:

        http://0.0.0.0:8080/

1. Install on Mac [Mountain Duck](http://mountainduck.io) you may choose a different _webDAV mount_ software. Mount replaces FTP.

1. In Mountain Duck, create a new `webDAV (HTTP)` connection. Fill the fields for `server` and `username`, `path` -- `/webdav/www` and port with your credentials, then click `connect`, it will ask for username and password from the Caddyfile webDAV config. You have mounted folder of your site from remote environment on your local PC and you can edit it.

1. Create an account on [CDN77](http://www.cdn77.com/) if you don't already have one.

1. Go to [CDN 77](http://client.cdn77.com) and create a `Resource` for your remote environment hosting: select `My Origin`, select `http` and in the `domain` field type in the your ip address and port.

1. Go to tab `other settings` and select `cache expiry` -- `10 minutes`, then go to `Purge` tab and `purge all files`. This action is needed to reduce the time of files caching.

1. To verify that the mount is working, you can edit some file and check if changes applied in the browser via the Endpoint URL from your recently created CDN Resource.

__Summary__: With Cloud hosting and mount, you can edit apps from your filesystem and see the edits reflected on the web without extra deployment work.


In the [next tutorial ](/webdav_linux_mount/) you will learn how to mount webDAV on linux.
NEXT: Go to [Mount webDAV on linux](/webdav_linux_mount/).