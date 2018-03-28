# 👁‍🗨 watch-proxy
Create a proxy to watch variables modifications

Watch function let you create a proxy object in order to listen for properties values changes. Then, you can create an object with many properties, update them and trigger some functions if these properties are listened. This is useful to avoid regenerate the DOM for listening and let modules interact under the hood.

- [x] Add Method for remove listener
- [ ] Multiple listeners for one property
- [ ] Add destroy method (GC)
- [ ] Add ES6 Proxy compatibility

## SYNTAX
**``` let proxy = utils.watch({}); ```**

## USE

```javascript

import { utils } from 'utils';

const obj = {
    value1: 0,
    value2: false
}

// create proxy
let proxy = utils.watch(obj);

// add a listener on the proxy
let listener = proxy.addListener('value1', function(){
    console.log('change');
});

proxy.value1 = 10; // console -> 'change'

// remove a listener
proxy.removeListener(listener);
proxy.value1 = 5; // console -> ø

```
## OPTIONS AND SETTINGS

To start using this function, you need to watch an object. Then, the `watch` function will return a proxy object that you should interact with. Another module in code may want to intercept a changement on the proxy properties values. To do so, the proxy returned hold some methods:

### Methods
#### ```addListner```
In order to listen for a property value changement. This method need two arguments: 

* a string calling the value you want to listen for
* a function you want to trigger when a modification has been detected on the value listened.

This method return a reference to the listener. Once you call this method on the proxy's property, the function will be triggered each time the value will be changed.

#### ```removeListner```
In order to remove a listener for a property. Since you already have created the listener, you only have to remove the listener by passing the listener reference in the proxy's removeListener method: `proxy.removeListener(listenerReference);`


