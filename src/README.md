
# INTUITION  mbakex CLI X extras


Extra commands for INTUITION.DEV's mbake CLI, including a native SQLite helper.


[INTUITION.DEV Home Page](https://www.INTUITION.DEV)

## Install


```sh
    npm i -g mbakex
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


