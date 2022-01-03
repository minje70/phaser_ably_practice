import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { config } from './script';
import io, { Socket } from 'socket.io-client';

enum openState {
	beforeEnter,
	afterEnter,
	wating,
}

export default function GameStart() {
	const [game, setGame] = useState(openState.beforeEnter);
	const [phaser, setPhaser] = useState<Phaser.Game | null>(null);
	const [socketState, setSocketState] = useState<Socket>(
		io('http://localhost:8080')
	);
	const onClick = () => {
		// 게임 신청
		socketState?.emit('startGame', { name: 'mijeong' });
	};
	useEffect(() => {
		socketState?.on('matchGame', (payload) => {
			console.log(payload);
			setGame(openState.afterEnter);
			setPhaser(new Phaser.Game(config));
		});
		return () => {
			socketState?.disconnect();
		};
	}, []);
	const onExit = () => {
		console.log('exit');
		setGame(openState.beforeEnter);
		// 닫자.
		phaser?.destroy(true);
		// setGame(openState.beforeEnter);
		setPhaser(null);
	};
	const onCancel = () => {
		// 취소하자
	};
	return (
		<div>
			{game === openState.afterEnter ? (
				<div></div>
			) : game === openState.beforeEnter ? (
				<>
					<button onClick={onClick}>입장</button>
				</>
			) : (
				<>
					<h1>Waiting</h1>
					<button onClick={onCancel}>취소</button>
				</>
			)}
			<button onClick={onExit}>Exit</button>
		</div>
	);
}
