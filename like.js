
/**
 * 
 */
var game = new Phaser.Game(800, 600, Phaser.CANVAS,'canvas', { preload: preload, create: create, update: update, render: render });
var platforms;
function preload() {
	game.load.tilemap('map', 'files/new.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('sky2', 'blue-sky.jpg');
    game.load.image('dirt', 'platform.png');
    game.load.image('like', 'like-128.png');
    game.load.image('coin', 'coin.png');
    game.load.spritesheet('phaser', 'DawnWalkSide_Dict.png', 130, 128);

}

var heart = false;
var x2 = false;
var facing = 'right';
var map;
var tileset;
var layer;
var p;
var cursors;
var likescore = 0;
var coinscore = 0;
var likeText;
var coinText;
function create() {
	game.add.tileSprite(0, 0, 1450, 610, 'sky2');
	game.stage.backgroundColor = ' #F0F00F';
	map = game.add.tilemap('map');
	map.addTilesetImage('platform', 'dirt');

	layer = map.createLayer('Tile Layer 1');
	 layer.resizeWorld();
	
    map.setCollisionBetween(0, 3);
    map.setCollisionBetween(3, 8);

    p = game.add.sprite(500, 480, 'phaser');

    game.physics.enable(p);

    game.physics.arcade.gravity.y = 200;
    

    map.setTileIndexCallback(4, hitLike, this);
    
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();
    
    p.animations.add('right', [0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15], 40, true);
    p.animations.add('jump', [7,13], 1, true);
  
    likes = game.add.group();
    coins = game.add.group();
   
    likes.enableBody = true;
    coins.enableBody = true;
    
   
    
    for (var i = 5; i < 200; i++)
    {
    	if(i % 10 == 0){
    		var coin = coins.create(i * 150, 370, 'coin');

            coin.body.gravity.y = 6;
            coin.body.bounce.y = 0.9 + Math.random() * 0.3;
    	}
    	else {
        var like = likes.create(i * 150, 370, 'like');

        like.body.gravity.y = 6;

        like.body.bounce.y = 0.7 + Math.random() * 0.4;
    	}
    	
    }
    
    likeText = game.add.text(p.body.right - 500, 200, 'score: 0', { fontSize: '32px', fill: '#000' });
    coinText = game.add.text(p.body.right - 500, 230, 'Coin: 0', { fontSize: '32px', fill: '#000' });

}

function hitLike(sprite, tile) {

    tile.alpha = 0.2;

    layer.dirty = true;

    return false;

}

function update() {
	
    game.physics.arcade.collide(p, layer);
    game.physics.arcade.collide(likes, layer);
    game.physics.arcade.collide(coins, layer);
    game.physics.arcade.overlap(p, coins, collectCoins, null, this);
    game.physics.arcade.overlap(p, likes, collectLikes, null, this);
    function collectLikes (p, likes) {
    	if(x2){
    		likescore++ ;
    	}
        likescore++ ;
        likes.kill();
        likeText.text = 'Likes: ' + likescore;
        

    }
    function collectCoins (p, coins) {

        coinscore++;
        coins.kill();
        coinText.text = 'Coin: ' + coinscore;
        

    }
   

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
    	if(!heart){
    		
			game.gamePaused();
			$.post( "game/update", { 'likes': likescore , 'coins': coinscore } );
			
			
    	}
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
   likeText.kill();
   likeText = game.add.text(p.body.right - 500, p.body.bottom - 400, 'Like: 0', { fontSize: '32px', fill: '#000' });
   likeText.text = 'Like: ' + likescore;
   coinText.kill();
   coinText = game.add.text(p.body.right - 500, p.body.bottom - 360, 'Coin: 0', { fontSize: '32px', fill: '#000' });
   coinText.text = 'Coin: ' + coinscore;

}

function render() {


}

