# Tap 

Tap your functions into method chains.

## Why

Functions give us flexibility about granularity and locality, but they can be awkward to compose with an value's methods.  `tap` makes using functions & methods together idiomatic, natural, and very easy to read.  [See here](http://hughfdjackson.com/javascript/2012/11/30/tapping-into-the-method-chain/) for a fuller discussion.

## Example

```javascript
    require('tap-chain').mixin(Object.prototype)
    
    var add = function(a, b){ return a + b },
        divide = function(a, b){ return a / b }
    
    var people = [
        { name: 'bob', age: 55 },
        { name: 'susan', age: 44 },
        { name: 'charles', age: 20 },
        { name: 'bex', age: 30 }
    ]
    
    var averageAge = people.map(function(p){ return p.age })
                           .reduce(add)
                           .tap(divide, people.length)
                           .tap(Math.round)
    averageAge
    //= 37
```

## API

### `tap.mixin (object, [objects]) -> object`

Mixes the `.tap` method into any number of objects.  If the environment supports es5, then the property will be set to *non-enumerable*.

```javascript
    var tap = require('tap-chain')

    // mix in to base backbone constructors
    tap.mixin(Backbone.Model, Backbone.Collection, Backbone.Router, Backbone.View)

    // mix in to a newly created object
    var player = tap.mixin({ name: 'scott pilgrim', health: 100 })

    // mix in to a blank object
    var map = tap.mixin(Object.create(null))

    // mix in to all objects - making .tap work on all values, even primitives (except `null` and `undefined`)
    tap.mixin(Object.prototype)
```

### `.tap (fn, [secondardy-args]) -> anyValue`

The mixed-in `.tap` method calls a function, using the context of the method as the first argument:

```javascript
    var inc = function(v){ return v + 1 },
        num = 5
        
    num.tap(inc)
    //= 6
```

`.tap` also takes optional secondary arguments:

```javascript
    var divide = function(a, b){ return a / b },
        num    = 10
        
    num.tap(divide, 2)
    //= 5
```

## Install 

`npm install tap-chain` or [download](https://raw.github.com/hughfdjackson/tap/master/tap.js).  Creates a CommonJS module if available, otherwise exports a global named `tap`.
