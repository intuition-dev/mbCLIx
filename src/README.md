
# INTUITION  CLI X extras


[INTUITION.DEV Home Page](https://www.INTUITION.DEV)

## Install

```sh
    npm i -g npm@next
    npm i -g node-gyp@latest 
    npm i -g mbakex
```

Note: We use a native sqlite driver. It likely needs `npm i -g node-gyp@latest`.

Notes: 
- It is best to install node via via nvm (https://github.com/nvm-sh/nvm)
- If node version changed, you may need to do this first:  `npm uninstall -g mbakex`


[Git Repo](http://git.metabake.net)

## npm trouble?

This may help:

disable se linux:
/usr/sbin/getenforce

npm i -g --unsafe-perm=true --allow-root mbakex

https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x

