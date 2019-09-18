# zip up the sample apps, update Base.ts version
# ncu -u
tsc
# node mbakex.js
npm publish
#sudo yarn global add  mbake --unsafe-perm=true --allow-root
# if changed node version do this:
# sudo yarn global remove mbakex



# yarn global add  mbakex
# mbakex

# find . -type f -name 'package-lock.json' 