Crafty.init( 800, 600, document.getElementById( 'game' ) );
Crafty.background( 'url( "img/bg.jpg" )' );

Crafty.c( 'PlayerCharacter', {
	init: function() {
	    this.requires('Fourway, Color')
			.fourway(4)
			.color('rgb(20, 75, 40)');
	}
} );

