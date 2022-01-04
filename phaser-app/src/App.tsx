import React, { useEffect } from 'react';
import { config } from '../src/script';

export default function App() {
	useEffect(() => {
		new Phaser.Game(config);
	});
	return <div></div>;
}
