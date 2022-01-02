import React, { useEffect } from 'react';
import { config } from '../src/script';

export default function App() {
	useEffect(() => {
		const gameScene = new Phaser.Game(config);
	});
	return <div>hello</div>;
}
