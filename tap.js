void function(root){

    var slice = [].slice

    var tap = function(fn){
        var val = this.valueOf ? this.valueOf() : this

        if ( arguments.length == 1 ) return fn(val)

        var args = slice.call(arguments, 1)
        return fn.apply(null, [val].concat(args))
    }

    tap.mixin = function(o){
        if ( Object.defineProperty ) Object.defineProperty(o, 'tap', { enumerable: false, value: tap, configurable: true, writable: true })
        else                         o.tap = tap
        return o
    }

    if ( typeof module == 'undefined' || module.exports == 'undefined' ) root.tap = tap
    else                                                                 module.exports = tap
}(this)
