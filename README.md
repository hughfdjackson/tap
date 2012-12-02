# Tap 

A mixin for seamless function and method interop - letting your stand-alone functions tap into the method chain

## Getting Started

To get started, use `tap.mixin` to add the method to any object.  For maximum awesome (at max ballsiness):

    tap.mixin(Object.prototype)
    
Once mixed in, any object that inherits it, or primative that inherits from an object that does, can have regular functions injected in to method chains:

    tap.mixin(Object.prototype)
    
    var o = { name: 'hugh', occupation: 'softare engineer'  }
    
    o.tap(Object.keys)
     .tap(JSON.stringify)
     .tap(alert)
 
    // alert -> ["name", "occupation"]
    

## API

#### `tap.mixin`

`tap.mixin` adds `.tap` to each object passed in.  If in an es5 environment, it will added as a non-enumerable, so as not to show up in loops.  Otherwise, it adds it as a regular property.

#### `.tap`

`.tap` takes a function, and any number of additional arguments.  It calls the function , passing in the value of `this` within the method as the first argument to the function, and the additional arguments are passed after that.

## Installation 

#### Node

Install via:

    npm install tap-chain
    
And require:

    var tap = require('tap-chain')

#### Browser

[download and include as a script tag](https://raw.github.com/hughfdjackson/tap/master/tap.js), or use npm with [browserify](https://github.com/substack/node-browserify) or [requirejs](http://requirejs.org/).

## More Info

This library has a [companion blog post](http://hughfdjackson.com/javascript/2012/11/30/tapping-into-the-method-chain/).
