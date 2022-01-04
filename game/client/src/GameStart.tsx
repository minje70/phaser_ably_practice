import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { config } from './script';

export default function GameStart() {
	const [isGameStart, setIsGameStart] = useState(false);
	const [phaser, setPhaser] = useState<Phaser.Game | null>(null);
	const onClick = () => {
		// 게임 신청
		// Scene을 만들고 그 안에서 startGame 걸고, matchGame emit을 건다.
		// 그럼 로딩도 어떻게든 할 수 있을거 같고
		// socketState?.emit('startGame', { name: 'mijeong' });
		setIsGameStart(true);
		setPhaser(new Phaser.Game(config));
	};
	const onExit = () => {
		console.log('exit');
		setIsGameStart(false);
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
			{isGameStart === true ? (
				<div></div>
			) : isGameStart === false ? (
				<>
					<button onClick={onClick}>입장</button>
				</>
			) : (
				<>
					<h1>Waiting</h1>
					<button onClick={onCancel}>취소</button>
				</>
			)}
			<button onClick={onExit}>게임 나가기</button>
		</div>
	);
}
