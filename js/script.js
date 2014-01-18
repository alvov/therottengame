// var rottenGame = new RottenEngine( '#game', {
// 		'area': {
// 			'width': '1000px',
// 			'height': '600px'
// 		}
// 	} );

// var testScene = new rottenGame.Scene( {
// 		'width': '1000px',
// 		'height': '600px',
// 		'background-image': 'url(img/bg.jpg)'
// 	} );
// testScene.build( 'Player', {
// 	'pos': [100,100],
// 	'size': [60,60]
// } );

var RottenGame = function(){

};
RottenGame.prototype = {
	start: function(){
		Crafty.init( 1000, 500 );
		Crafty.background( 'url(img/bg.jpg)' );
		Crafty.scene( 'Loading' );
	}
};

Crafty.c( 'Grid', {
	init: function() {
		this.attr( {
			w: 16,
			h: 16
		} )
	},

	// Locate this entity at the given position on the grid
	at: function( x, y ) {
		if ( x === undefined && y === undefined ) {
			return { x: this.x/16, y: this.y/16 }
		} else {
			this.attr( { x: x * 16, y: y * 16 } );
			return this;
		}
	}
} );
Crafty.c( 'Actor', {
	init: function() {
		this.requires( '2D, Canvas, Grid' );
	},
} );
Crafty.c( 'Player', {
	init: function(){
		this
			.requires( 'Actor, Fourway, Collision, spr_player, SpriteAnimation' )
			.origin( 17, 29 )
			.fourway( 2 )
			.reel( 'player_moving', 1000, 0, 0, 7 );
		var that = this;
		this.bind( 'NewDirection', function( data ){
			if ( data.x || data.y ) {
				this.animate( 'player_moving', -1 );
			} else {
				this
					.pauseAnimation()
					.resetAnimation();
			}
		} );
	}
} );

Crafty.scene( 
	'TestScene', 
	function(){
		this.player = Crafty.e( 'Player' ).at( 10, 10 );
		Crafty.addEvent( this, Crafty.stage.elem, 'mousemove', function( e ){
			var angle = Math.atan2(
				( e.layerY - this.player.y - 29 ), 
				( e.layerX - this.player.x - 17 )
			);
			this.player.rotation = Crafty.math.radToDeg( angle );
			// console.log(this.player.rotation);
		} );
	} 
);

Crafty.scene(
	'Loading', 
	function(){
		Crafty.load( ['img/player.png'], function(){
			Crafty.sprite( 60, 'img/player.png', {
				spr_player:  [0, 0]
			} );

			Crafty.scene( 'TestScene' );
		} );
	}
);

var rottenGame = new RottenGame();
rottenGame.start();