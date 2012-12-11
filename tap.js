void function(root){

    var slice = [].slice

    var tap = function(fn){
        var val = this.valueOf ? this.valueOf() : this

        if ( arguments.length == 1 ) return fn(val)

        var args = slice.call(arguments, 1)
        return fn.apply(null, [val].concat(args))
    }

    // mixin

    var tapPD = { enumerable: false, value: tap, configurable: true, writable: true }

    var mixinOne = function(o){
        if ( Object.defineProperty ) Object.defineProperty(o, 'tap', tapPD)
        else                         o.tap = tap
    }

    tap.mixin = function(){
        var args = slice.call(arguments)
        args.forEach(mixinOne)
        return args[0]
    }


    if ( typeof module == 'undefined' || module.exports == undefined ) root.tap = tap
    else                                                               module.exports = tap
}(this)
