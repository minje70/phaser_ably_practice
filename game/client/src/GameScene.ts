import Phaser from 'phaser';
import { config } from './script';
import { Socket } from 'socket.io-client';

const PADDLE_SPEED = 700;

export class GameScene extends Phaser.Scene {
	private paddle1: Phaser.Physics.Arcade.Image | null = null;
	private paddle2: Phaser.Physics.Arcade.Image | null = null;
	private ball: Phaser.Physics.Arcade.Image | null = null;
	// 방향키
	private upKey1: Phaser.Input.Keyboard.Key | null = null;
	private downKey1: Phaser.Input.Keyboard.Key | null = null;
	private leftKey1: Phaser.Input.Keyboard.Key | null = null;
	private rightKey1: Phaser.Input.Keyboard.Key | null = null;
	private escKey1: Phaser.Input.Keyboard.Key | null = null;

	private upKey2: Phaser.Input.Keyboard.Key | null = null;
	private downKey2: Phaser.Input.Keyboard.Key | null = null;
	private leftKey2: Phaser.Input.Keyboard.Key | null = null;
	private rightKey2: Phaser.Input.Keyboard.Key | null = null;

	constructor() {
		super({ key: 'game', active: true });
	}

	preload() {
		this.load.image('paddle', '/paddle.png');
		this.load.image('paddle2', '/paddle2.png');
		this.load.image('ball', '/ball.png');
	}

	create() {
		this.paddle1 = this.physics.add.image(800, 300, 'paddle');
		this.paddle1.setCollideWorldBounds(true);
		this.paddle1.setBounce(0.2);

		this.paddle2 = this.physics.add.image(100, 300, 'paddle2');
		this.paddle2.setCollideWorldBounds(true);
		this.paddle2.setBounce(0.2);

		this.ball = this.physics.add.image(200, 150, 'ball');
		this.physics.add.collider(this.paddle1, this.ball);
		this.physics.add.collider(this.paddle2, this.ball);
		this.physics.add.collider(this.paddle2, this.paddle1);

		this.ball.setGravity(0, 0);
		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1);
		this.ball.setVelocity(500, 500);
		// 키 추가
		this.upKey1 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.UP
		);
		this.downKey1 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.DOWN
		);
		this.leftKey1 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.LEFT
		);
		this.rightKey1 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.RIGHT
		);

		this.upKey2 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.W
		);
		this.downKey2 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.S
		);
		this.leftKey2 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.A
		);
		this.rightKey2 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.D
		);
		this.escKey1 = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.ESC
		);
	}
	update(time: number, delta: number): void {
		if (this.paddle1) {
			if (this.downKey1?.isDown) this.paddle1.setVelocityY(PADDLE_SPEED);
			if (this.upKey1?.isDown) this.paddle1.setVelocityY(-PADDLE_SPEED);
			if (this.leftKey1?.isDown) this.paddle1.setVelocityX(-PADDLE_SPEED);
			if (this.rightKey1?.isDown) this.paddle1.setVelocityX(PADDLE_SPEED);
			if (this.escKey1?.isDown) this.sys.game.destroy(true);
		}
		if (this.paddle2) {
			if (this.downKey2?.isDown) this.paddle2.setVelocityY(PADDLE_SPEED);
			if (this.upKey2?.isDown) this.paddle2.setVelocityY(-PADDLE_SPEED);
			if (this.leftKey2?.isDown) this.paddle2.setVelocityX(-PADDLE_SPEED);
			if (this.rightKey2?.isDown) this.paddle2.setVelocityX(PADDLE_SPEED);
		}
	}
	destroy() {}
}
