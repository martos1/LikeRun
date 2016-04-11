/**
 * 
 */
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var platforms;
function preload() {
	game.load.tilemap('map', 'files/new.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('sky2', 'blue-sky.jpg');
    game.load.image('dirt', 'platform.png');
    game.load.spritesheet('phaser', 'DawnWalkSide_Dict.png', 130, 128);

}

var facing = 'right';
var map;
var tileset;
var layer;
var p;
var cursors;

function create() {
	game.add.tileSprite(0, 0, 9700, 610, 'sky2');
	game.stage.backgroundColor = ' #F0F00F';
	map = game.add.tilemap('map');
	map.addTilesetImage('platform', 'dirt');

	layer = map.createLayer('Tile Layer 1');
	 layer.resizeWorld();
	
    map.setCollisionBetween(1, 12);

    p = game.add.sprite(0, 480, 'phaser');

    game.physics.enable(p);

    game.physics.arcade.gravity.y = 200;

    map.setTileIndexCallback(5, hitCoin, this);
    
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();
    
    p.animations.add('right', [0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15], 20, true);
    p.animations.add('jump', [7,13], 1, true);

}

function hitCoin(sprite, tile) {

    tile.alpha = 0.2;

    layer.dirty = true;

    return false;

}

function update() {

    game.physics.arcade.collide(p, layer);

    p.body.velocity.x = 0;

    if (cursors.up.isDown)
    {
        if (p.body.onFloor())
        {
            p.body.velocity.y = -200;
            p.animations.play('jump');
        }
    }
    if(p.body.onWall()){
    	p.animations.play('jump');
    }

   if (true)
    {
        p.body.velocity.x = 250;
        if(p.body.onFloor()){
        	p.animations.play('right');
        }
        else{
        	p.animations.play('jump');
        }
    }

}

function render() {


}
