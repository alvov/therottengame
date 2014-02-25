Crafty.c( 'AI', {
	init: function(){
		this.cache = this.cache || {};
		this.requires( 'Actor' );
		this.bind( 'EnterFrame', this.act );
	},
	act: function(){
		var distanceToPlayer,
			step;
		this.cache.player = this.cache.player || Crafty( 'Player' );
		if ( this.watchPlayerPos() ) {
			distanceToPlayer = Crafty.math.distance( this._x, this._y, this.cache.player._x, this.cache.player._y );
			if ( distanceToPlayer <= this.props.hitDistance ) {
				// attack player
			} else {
				// chase player
				if ( distanceToPlayer < this.props.speed ){
					this.x = this.cache.player._x;
					this.y = this.cache.player._y;
				} else {
					step = this.props.speed / distanceToPlayer;
					this.shift(
						Math.ceil( ( this.cache.player._x - this._x ) * step ),
						Math.ceil( ( this.cache.player._y - this._y ) * step ) );
				}
			}
		} else {
			// breed
			// if ( this.isPlaying( 'monster_moving' ) ) {
			// 	this
			// 		.pauseAnimation()
			// 		.resetAnimation();
			// }
		}
	},
	watchPlayerPos: function(){
		var playerInSight = false,
			angleToPlayer;
		if ( !this.cache.player.length ) return false;

		angleToPlayer = Crafty.math.abs( this.getAngleTo( this.cache.player._x, this.cache.player._y ) - this.rotation );
		// normalize angle
		angleToPlayer %= 360;
		playerInSight = ( angleToPlayer < this.props.sightRange / 2 );
		return playerInSight;
	}
} );
