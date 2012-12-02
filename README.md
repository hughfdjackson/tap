# Tap 

Tap your functions into method chains.

## Example

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

## Why

Functions give us flexibility about granularity and locality, but they can be awkward to compose with an value's methods.  `tap` makes using functions & methods together idiomatic, natural, and very easy to read.  [See here](http://hughfdjackson.com/javascript/2012/11/30/tapping-into-the-method-chain/) for a fuller discussion.

## API

`tap.mixin`
`(object) -> object`

Mixes the `.tap` method into any object.  If the environment supports es5, then the property will be set to `non-enumerable`


`.tap`
`(fn, [secondardy-args]) -> anyValue`

The mixed-in `.tap` method calls a function, using the context of the method as the first argument:

    var inc = function(v){ return v + 1 },
        num = 5
        
    num.tap(inc)
    //= 6
    
`.tap` also takes optional secondary arguments:

    var divide = function(a, b){ return a / b },
        num    = 10
        
    num.tap(divide, 2)
    //= 5

## Install 

`npm install tap-chain` or [download](https://raw.github.com/hughfdjackson/tap/master/tap.js).  Creates a CommonJS module if available, otherwise exports a global named `tap`.
