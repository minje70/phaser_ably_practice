import Phaser from 'phaser';
import { GameScene } from './GameScene';

export const config = {
	width: 1000,
	type: Phaser.AUTO,
	height: 700,
	backgroundColor: '#FFFFF',
	parent: 'gameContainer',
	scene: [GameScene],
	physics: {
		default: 'arcade',
	},
};
