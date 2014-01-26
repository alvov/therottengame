var RottenGame = function(){};
RottenGame.prototype = {
	start: function(){
		Crafty.init( 1000, 500 );
		Crafty.background( 'url(img/bg.jpg)' );
		Crafty.scene( 'Loading' );
	},
	followMouse: function(){

	}
};

Crafty.c( 'Grid', {
	init: function() {
		this.attr( {
			w: 16,
			h: 16
		} )
	},
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
	getAngleTo: function( targetX, targetY ){
		return Crafty.math.radToDeg( Math.atan2(
			( targetY - this._y - this.cache.headOffset.y ), 
			( targetX - this._x - this.cache.headOffset.x )
		) );
	}
} );

Crafty.c( 'Player', {
	init: function(){
		var that = this;
		this.cache = {
			headOffset: { x: 17, y: 29 }
		};

		this
			.requires( 'Actor, Fourway, Collision, spr_player, SpriteAnimation' )
			.origin( this.cache.headOffset.x, this.cache.headOffset.y )
			.fourway( 4 )
			.reel( 'player_moving', 1000, 0, 0, 7 );

		this
			.bind( 'NewDirection', function( data ){
				if ( data.x || data.y ) {
					this.animate( 'player_moving', -1 );
				} else {
					this
						.pauseAnimation()
						.resetAnimation();
				}
			} )
			.bind( 'Moved', function( data ){
				this.followMouse();
			} );
	},
	followMouse: function( mouseX, mouseY ){
		mouseX = mouseX || this.cache.mouseX;
		mouseY = mouseY || this.cache.mouseY;
		if ( undefined === mouseX || undefined === mouseY ) return;
		this.rotation = this.getAngleTo( mouseX, mouseY );
		this.cache.mouseX = mouseX;
		this.cache.mouseY = mouseY;
	}
} );

Crafty.c( 'Monster', {
	init: function(){
		this.props = {
			speed: 2,
			hitDistance: 5,
			sightRange: 180,
			damage: 10,
			health: 100
		};
		this.cache = {
			headOffset: { x: 34, y: 41 }
		};
		this
			.requires( 'AI, Collision, spr_monster, SpriteAnimation' )
			.origin( this.cache.headOffset.x, this.cache.headOffset.y )
			.reel( 'monster_moving', 1000, 0, 0, 7 );
		this.animate( 'monster_moving', -1 );
	}
} );

Crafty.scene( 
	'TestScene', 
	function(){
		var that = this;
		// Crafty.viewport.follow( this.player, 0, 0 );
		this.monster1 = Crafty.e( 'Monster' ).at( 20, 15 );
		this.monster2 = Crafty.e( 'Monster' ).at( 30, 15 );
		this.player = Crafty.e( 'Player' ).at( 10, 10 );
		Crafty
			.addEvent( this, Crafty.stage.elem, 'mousemove', function( e ){
				this.player.followMouse( e.layerX, e.layerY );
			} );
		this.player.bind( 'Moved', function( data ){
			//
		} );
	} 
);

Crafty.scene(
	'Loading', 
	function(){
		Crafty.load( ['img/player.png', 'img/monster.png'], function(){
			Crafty.sprite( 60, 'img/player.png', {
				spr_player:  [0, 0]
			} );
			Crafty.sprite( 80, 'img/monster.png', {
				spr_monster: [0, 0]
			} );

			Crafty.scene( 'TestScene' );
		} );
	}
);

var rottenGame = new RottenGame();
rottenGame.start();