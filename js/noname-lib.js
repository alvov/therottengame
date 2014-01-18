var $ = function $( selector ){
		if ( !( this instanceof $ ) ) {
			return new $( selector );
		}

		if ( selector ) {
			this.el = typeof selector === 'string' ? document.querySelectorAll( selector ) : [selector];
		}
	};
$.extend = function(){
	var result = {},
		i, l,
		key;
	for ( i = 0, l = arguments.length; i < l; i++ ){
		for ( key in arguments[i] ) {
			if ( arguments[i].hasOwnProperty( key ) ){
				result[key] = typeof arguments[i][key] === 'object' ? this.extend( arguments[i][key] ) : arguments[i][key];
			}
		}
	}
	return result;
};
$.prototype = {
	'append': function( child, params ){
		var key,
			i, l;
		child = document.createElement( child );
		for ( key in params ){
			child[key] = params[key];
		}
		this.each( function(){
			this.appendChild( child );
		} );
		return new $( child );
	},
	'css': function( params ){
		var key,
			value,
			i, l;
		for ( key in params ){
			value = params[key];
			key = key.split( '-' );
			for ( i = 0, l = key.length; i < l; i++ ){
				if ( i || !key[0] ){
					key[i] = key[i].charAt(0).toUpperCase() + key[i].slice(1);
				}
			}
			key = key.join( '' );

			this.each( function(){
				this.style[key] = value;
			} );
		}
		return this;
	},
	'each': function( callback ){
		var i
		for ( i = 0, l = this.el.length; i < l; i++ ){
			callback.apply( this.el[i] );
		}
	}
};