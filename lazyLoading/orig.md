
# Lazy Loading

Lading using a bundler creates large bundles, that could be OK for smaller apps. For 
professional apps you can use a dependency/require manager, one example is: depp.js

[depp.js](https://github.com/muicss/johnnydepp)

For example: load data and load images, then libs: after libs load another lib. 
Your goal is to as quickly as possible paint the screen even for mobile end-users. 

## Tool Belt

The tool belt has libraries that often needed.

[toolBelt.js](https://github.com/intuition-dev/toolBelt/blob/master/toolBelt/toolBelt.js)

One way to use the tool belt is to install mbake cli(npm i -g mbake) and run: mbake -f .

#### FOUT

Tool belt also helps handles FOUT ( https://en.wikipedia.org/wiki/Flash_of_unstyled_content )

## Async of Custom Elements

You can load Custom Elements async without the user of the Custom Elementsonent knowing any of the needed dependencies, eg:
[Example async Custom Elements](https://github.com/intuition-dev/INTUITION/blob/master/examples/intu4S_S/www/custel/item-custel.ts)

## Advanced: Async loading ViewModel

If you create a ViewModel using new - it will not have the needed dependencies - so you must disable the constructor. Instead create a static inst() method that returns a promise: once required resources are ready.

[ViewModel loading required dependencies](https://github.com/intuition-dev/INTUITION/blob/master/examples/CRUD/www/models/CRUD1ViewModel.ts)

