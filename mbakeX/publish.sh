# zip up the sample apps, update Base.ts version
# ncu -u
tsc
node mbakeX.js
npm publish
#sudo npm i -g mbake --unsafe-perm=true --allow-root
# if changed node version do this:
# sudo yarn global remove mbake
yarn global add mbakeX
mbakeX

# find . -type f -name 'package-lock.json' 