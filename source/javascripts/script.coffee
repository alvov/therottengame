class @RottenGame
  start: ->
    Crafty.init( 1000, 500 )
    Crafty.background( 'url(images/bg.jpg)' )
    Crafty.scene( 'Loading' )
  followMouse: ->

class Grid
  init: ->
    @attr
      w: 16
      h: 16
  at: ( x, y ) ->
    if not x? or not y?
      x: @x/16
      y: @y/16
    else
      @attr
        x: x * 16
        y: y * 16
    return @

class Actor
  init: ->
    @requires( '2D, Canvas, Grid' )
  getAngleTo: ( targetX, targetY ) ->
    Crafty.math.radToDeg(
      Math.atan2(
        ( targetY - @_y - @cache.headOffset.y )
        ( targetX - @_x - @cache.headOffset.x ) ) )

class Player
  init: ->
    @cache = headOffset: { x: 17, y: 29 }

    @requires( 'Actor, Fourway, Collision, spr_player, SpriteAnimation' )
    .origin( @cache.headOffset.x, @cache.headOffset.y )
    .fourway( 4 )
    .reel( 'player_moving', 1000, 0, 0, 7 )

    @bind 'NewDirection', ( data ) ->
      if data.x or data.y
        @animate( 'player_moving', -1 )
      else
        @pauseAnimation()
        .resetAnimation()
    @bind 'Moved', ( data ) ->
      @followMouse()

  followMouse: ( mouseX, mouseY ) ->
    mouseX = mouseX or @cache.mouseX
    mouseY = mouseY or @cache.mouseY
    return unless mouseX? and mouseY?
    @rotation = @getAngleTo( mouseX, mouseY )
    @cache.mouseX = mouseX
    @cache.mouseY = mouseY

class Monster
  init: ->
    @props =
      speed: 2
      hitDistance: 5
      sightRange: 180
      damage: 10
      health: 100
    @cache =
      headOffset:
        x: 34
        y: 41
    @requires( 'AI, Collision, spr_monster, SpriteAnimation' )
    .origin( @cache.headOffset.x, @cache.headOffset.y )
    .reel( 'monster_moving', 1000, 0, 0, 7 )
    @animate( 'monster_moving', -1 )

Crafty.c( 'Grid', new Grid )
Crafty.c( 'Actor', new Actor )
Crafty.c( 'Player', new Player )
Crafty.c( 'Monster', new Monster )

Crafty.scene 'TestScene', ->
  # Crafty.viewport.follow( this.player, 0, 0 )
  @monster1 = Crafty.e( 'Monster' ).at( 20, 15 )
  @monster2 = Crafty.e( 'Monster' ).at( 30, 15 )
  @player = Crafty.e( 'Player' ).at( 10, 10 )

  Crafty.addEvent @, Crafty.stage.elem, 'mousemove', ( e ) ->
    @player.followMouse( e.layerX, e.layerY )
  @player.bind( 'Moved', ( data ) -> )

Crafty.scene 'Loading', ->
  Crafty.load ['images/player.png', 'images/monster.png'], ->
    Crafty.sprite 60, 'images/player.png',  spr_player:  [0, 0]
    Crafty.sprite 80, 'images/monster.png', spr_monster: [0, 0]
    Crafty.scene( 'TestScene' )
