/**
 * Generated from the Phaser Sandbox
 *
 * http://phaser.io/sandbox/JSqGRITa
 *
 * This source requires Phaser 2.4.4
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });



function preload() {

    game.load.image('cyberglow', 'assets/textures/cyberglow.png');
    game.load.image('tron', 'http://s189.photobucket.com/user/angels_27/media/element_logo1.png.html');
    game.load.image('metal', 'assets/textures/metal.png');
    game.load.image('factory', 'assets/textures/factory.png');
    game.load.image('ooze', 'assets/textures/ooze.png');

}


var effect;
var image;
var mask = new Phaser.Rectangle();

function create() {

    game.stage.backgroundColor = '#000042';

    var floor = game.add.image(0, game.height, 'tron');
    floor.width = 800;
    floor.anchor.y = 1.5;

    effect = game.make.bitmapData();
    effect.load('atari');

    image = game.add.image(game.world.centerX, game.world.centerY, effect);
    image.anchor.set(0.5);
    image.smoothed = false;

    mask.setTo(0, 0, effect.width, game.cache.getImage('ooze').height);

    //  Tween the rasters
    game.add.tween(mask).to( { y: -(mask.height - effect.height) }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);

    //  Tween the image
    game.add.tween(image.scale).to( { x: 4, y: 4 }, 3000, Phaser.Easing.Quartic.InOut, true, 0, 100, true);

}

function update() {

    effect.alphaMask('tron', effect, mask);

    image.rotation += 0.01;

}

function render() {

}
