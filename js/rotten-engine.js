var	RottenEngine = function( area, params ){

	if ( !area ) return;

	this.$area = $( area );
	this.$area.css( $.extend( {
		'overflow': 'hidden'
	}, params.area ) );

};
RottenEngine.prototype = {
	'scene': function( params ){
		this.$scene = this.$scene || this.$area.append( 'div', { 'id' : 'scene' } );
		this.$scene.css( params );
	}
}