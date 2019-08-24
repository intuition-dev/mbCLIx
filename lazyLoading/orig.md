

## Advanced: Async loading ViewModel

If you create a ViewModel using new - it will not have the needed dependencies - so you must disable the constructor. Instead create a static inst() method that returns a promise: once required resources are ready.

[ViewModel loading required dependencies](https://github.com/intuition-dev/INTUITION/blob/master/examples/CRUD/www/models/CRUD1ViewModel.ts)

