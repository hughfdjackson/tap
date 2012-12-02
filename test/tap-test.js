var a   = require('assert'),
    _   = require('underscore'),
    tap = require('../')


var id = function(v){ return v }

suite('tap.maixin')

test('not applied to Object.prototype by default', function(){
    a.throws(function(){ 
        ({}).tap(id)
    })
})


test('can be mixed in to object', function(){
    var o = tap.mixin({})
    a.doesNotThrow(function(){
        o.tap(id)
    })
})

test('mutates an object', function(){
    var o = {}
    tap.mixin(o)
    a.doesNotThrow(function(){
        o.tap(id)
    })
})

test('takes any number of objects, mutating them and returning the first', function(){
    var o1 = {},
        o2 = {},
        o3 = {},
        ret = tap.mixin(o1, o2, o3)

    a.equal(ret, o1)
    
    ;[o1, o2, o3].forEach(function(o){ a.ok(o.tap) })
})

test('with prop descriptor', function(){
    if ( !Object.defineProperty ) return

    var o  = tap.mixin({}),
        o2 = _.extend({}, o)

    a.equal(o2.tap, undefined)
    a.equal(o.tap, tap)
    
    // mixin is side-effectful
    tap.mixin(o)
    a.equal(o.tap, tap)
    
    // deletable
    delete o.tap 
    a.equal(o.tap, undefined)

    // writable
    tap.mixin(o)
    o.tap = 'foo'
    a.equal(o.tap, 'foo')
})

test('without prop descriptor tap still works', function(){
    if ( Object.defineProperty ) return

    var o = tap.mixin({})
    a.ok(o.tap)
})

test('mixes in with deletable', function(){
    var o = tap.mixin({})
    delete o.tap
    a.ok( !o.hasOwnProperty('tap') )
})


suite('tap - single argument')

test('tap against Primatives', function(){
    
    tap.mixin(String.prototype)
    tap.mixin(Boolean.prototype)
    tap.mixin(Number.prototype)

    var sayTwice = function(str){ return str + str },
        negate = function(v){ return !v },
        inc    = function(v){ return v + 1 }

    a.equal('foo'.tap(sayTwice), 'foofoo')
    a.equal(false.tap(negate), true)
    a.equal((1).tap(inc), 2)

    // cleanup
    delete String.prototype.tap
    delete Boolean.prototype.tap
    delete Number.prototype.tap
})

test('tap against objects', function(){
    tap.mixin(Object.prototype)

    var o = { x: '3', y: '2' }.tap(_.keys)

    a.deepEqual(o, ['x', 'y'])

    // cleanup
    delete Object.prototype.tap
})

test('tap against arrays', function(){
    tap.mixin(Array.prototype)

    var v = [1, 2, 3].tap(_.first)

    a.equal(v, 1)
    // cleanup
    delete Array.prototype.tap
})

test('tap against objects inheriting from `null`', function(){
    
    var o = tap.mixin(Object.create(null))

    a.doesNotThrow(function(){
        o.tap(_.extend, { x: 'foo' })
    })
})

suite('tap with multiple arguments')

test('it should pass the arguments to the function supplied *after* the `this` value of .tap', function(){
    var o = tap.mixin({}),
        shallowExtend = function(a, b){ for ( var p in b ) a[p] = b[p]; return a }

    
    o.tap(shallowExtend, { test: 'val' })

    a.ok(_.contains(_.keys(o), 'test'))
    a.ok(_.contains(_.values(o), 'val'))
})
