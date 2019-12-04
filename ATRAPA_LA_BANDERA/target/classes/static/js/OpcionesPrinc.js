class OpcionesPrinc extends Phaser.Scene {

	constructor(){

		super({key: "OpcionesPrinc", active:true});

	}

	preload(){
		//MENU OPCIONES
		this.load.image('fondoOpciones', 'assets/img/MenuOpciones/fondoOpciones.png'); //FONDO

		this.load.image('bajarVolumen', 'assets/img/MenuOpciones/bajarVolumen.png');
		this.load.image('subirVolumen', 'assets/img/MenuOpciones/subirVolumen.png');
		this.load.image('quitarVolumen', 'assets/img/MenuOpciones/quitarVolumen.png');
		this.load.image('volverOpciones', 'assets/img/MenuOpciones/volver.png');

		this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');

		this.load.audio('musica', './js/Juego.js');
	}

	create(){

		this.ZERO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
		this.SEVEN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);
		this.EIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);
		this.NINE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);

		var height = game.config.height;
		var width = game.config.width;

		//get center of the canvas
		var x = width/2 ;
		var y = height/2;

		var fondoOpcionesPrinc = this.add.sprite(x, y, "fondoOpciones");

		//set the width of the sprite
		fondoOpcionesPrinc.displayWidth = width;
		//scale evenly
		fondoOpcionesPrinc.scaleX = fondoOpcionesPrinc.scaleY;

		this.volumenText = this.add.bitmapText(x*7.7/8, y*7.3/8, 'arcade', '0.5: ').setTint(0x003333);
		this.volumenText.setScale(0.7);

		//BOTONES DE VOLUMEN
		this.subirVolumen = this.add.image(x*6/8, y*9/8, 'subirVolumen').setScale(0.5);
		this.subirVolumen.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.subir());

		this.bajarVolumen = this.add.image(x*10/8, y*9/8, 'bajarVolumen').setScale(0.5);
		this.bajarVolumen.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.bajar());

		this.quitarVolumen = this.add.image(x, y*9/8, 'quitarVolumen').setScale(0.5);
		this.quitarVolumen.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.quitar());

		//BOTON VOLVER
		this.volverOpciones = this.add.image(x, y*14/8, 'volverOpciones').setScale(0.4);
		this.volverOpciones.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.volver());
	}

	update(time, delta){

		if(this.ZERO.isDown){
			this.volver();
		}

		if(this.SEVEN.isDown){
			this.subir();
		}

		if(this.EIGHT.isDown){
			this.quitar();
		}

		if(this.NINE.isDown){
			this.bajar();
		}

	}

	volver() {
		game.scene.sendToBack('OpcionesPrinc');
		game.scene.stop('OpcionesPrinc');
		game.scene.resume('MenuPrincipal');

	}

	subir(){
		if(game.sound.volume<1){
			var level = Math.round10(game.sound.volume+0.1)
			game.sound.setVolume(level);
			this.volumenText.setText(level*10);
		}

	}

	bajar(){
		if(game.sound.volume>0){
			var level = Math.round10(game.sound.volume-0.1)
			game.sound.setVolume(level);
			this.volumenText.setText(level);
		}

	}

	quitar(){

		game.sound.mute = true;
		game.sound.setVolume(0);
		this.volumenText.setText('0');

	}

}