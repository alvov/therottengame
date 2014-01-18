var	RottenEngine = function( viewport, params ){

	if ( !viewport ) return;

	this.$viewport = $( viewport );
	this.$viewport.css( $.extend( {
		'overflow': 'hidden'
	}, params.viewport ) );

};
RottenEngine.prototype = {
	Scene: function( params ){
		this.scenes = this.scenes || {};
		this.$scene = this.$viewport.append( 'div', { 'id' : 'scene' } );
		this.$scene.css( params );
	};
RottenEngine.Scene = function( params ){
	
};
RottenEngine.Scene.prototype = {
	build: function( objType, params ){
		if ( !objType || typeof RottenEngine[objType] !== 'function' ) return;
		return new ( RottenEngine[objType].call( this, params ) );
	};
}
RottenEngine.Player = function( params ){
	// this.player = 
}