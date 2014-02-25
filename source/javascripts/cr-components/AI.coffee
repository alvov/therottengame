class AI
  init: ->
    @cache ||= {}
    @requires( 'Actor' )
    @bind( 'EnterFrame', @act )

  act: ->
    @cache.player ||= Crafty( 'Player' )
    if @watchPlayerPos
      distanceToPlayer = Crafty.math.distance( @_x, @_y, @cache.player._x, @cache.player._y )

      if distanceToPlayer <= @props.hitDistance
        # attack player
      else
        # chase player
        if distanceToPlayer < @props.speed
          @x = @cache.player._x
          @y = @cache.player._y
        else
          step = @props.speed / distanceToPlayer
          @shift(
            Math.ceil( ( @cache.player._x - @_x ) * step ),
            Math.ceil( ( @cache.player._y - @_y ) * step ) )
    else
      # breed
      # if ( this.isPlaying( 'monster_moving' ) ) {
      # 	this
      # 		.pauseAnimation()
      # 		.resetAnimation();
      # }

  watchPlayerPos: ->
    playerInSight = false
    return false if @cache.player.length?

    angleToPlayer = Crafty.math.abs( @getAngleTo( @cache.player._x, @cache.player._y ) - @rotation )
    # normalize angle
    angleToPlayer %= 360
    playerInSight = ( angleToPlayer < @props.sightRange / 2 )

Crafty.c( 'AI', new AI )
