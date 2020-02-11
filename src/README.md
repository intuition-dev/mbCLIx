
# INTUITION  mbakex CLI X extras


This page has extra mbake features, used by INTUITION. 


[INTUITION.DEV Home Page](https://www.INTUITION.DEV)

## Install

Note: Some of the upstream packages we user are native, so you need to : apt-get install build-essential or similar to get the platfrom C compiler. https://github.com/npm/cli/issues/287

```sh
    apt-get install build-essential
    npm i -g npm@next
    npm i -g node-gyp@latest
    node-gyp -v
    npm i -g --unsafe-perm=true --allow-root mbakex
```

[Git Repo](http://git.metabake.net)


## npm install troubles?

Due to native upstream modules, when chaning version of node, you may have issues. It helps to install node via nvm. 


While doing the updates, and get the error 
> Node Sass could not find a binding for your current environment


To solve it, within the folder where `mbake` globally located need to run:
`npm rebuild node-sass`

Or you may to do a fully remove all node, this fixes any issue:
https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x


You may need to disable SE in linux:
` /usr/sbin/getenforce `


Or even manage the firewall: https://github.com/intuition-dev/intuServices/tree/master/src/node-srv/fw
