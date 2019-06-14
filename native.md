## Updating Mbake

While doing the update of mbake via: `yarn global add mbake`, and got the error of 
> Node Sass could not find a binding for your current environment

To solve it, within the folder where `mbake` globally located need to run:
`npm rebuild node-sass`