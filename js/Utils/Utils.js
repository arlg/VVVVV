
/**
 * requestAnimationFrame polyfill by Erik Möller
 * Fixes from Paul Irish and Tino Zijdel
 *
 * @see http://goo.gl/ZC1Lm
 * @see http://goo.gl/X0h6k
 */

(function(){for(var d=0,a=["ms","moz","webkit","o"],b=0;b<a.length&&!window.requestAnimationFrame;++b)window.requestAnimationFrame=window[a[b]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[a[b]+"CancelAnimationFrame"]||window[a[b]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var a=Date.now(),c=Math.max(0,16-(a-d)),e=window.setTimeout(function(){b(a+c)},c);d=a+c;return e});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})})();

//From sketch.js
// Mixed into the window object
var globals = {

    PI         : Math.PI,
    TWO_PI     : Math.PI * 2,
    HALF_PI    : Math.PI / 2,
    QUARTER_PI : Math.PI / 4,

    abs        : Math.abs,
    acos       : Math.acos,
    asin       : Math.asin,
    atan2      : Math.atan2,
    atan       : Math.atan,
    ceil       : Math.ceil,
    cos        : Math.cos,
    exp        : Math.exp,
    floor      : Math.floor,
    log        : Math.log,
    max        : Math.max,
    min        : Math.min,
    pow        : Math.pow,
    round      : Math.round,
    sin        : Math.sin,
    sqrt       : Math.sqrt,
    tan        : Math.tan,

    // TODO: map, lerp (etc)

    random     : function( min, max ) {

        if ( min && typeof min.length === 'number' && !!min.length )
            return min[ Math.floor( Math.random() * min.length ) ];

        if ( typeof max !== 'number' )
            max = min || 1, min = 0;

        return min + Math.random() * (max - min);
    }
};

// Soft object merge
    function extend( target, source ) {

        for ( var prop in source ) {

            if ( !target.hasOwnProperty( prop ) ) {
                target[ prop ] = source[ prop ];
            }
        }

        return target;
    }

extend( self, globals );

