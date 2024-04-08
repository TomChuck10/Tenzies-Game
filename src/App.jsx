import { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./Timer";

const App = () => {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [numberOfRolls, setNumberOfRolls] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [time, setTime] = useState(0);

	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every(die => die.value === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
			setIsRunning(false);
		}
	}, [dice]);

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	function rollDice() {
		if (!tenzies) {
			setDice(oldDice =>
				oldDice.map(die => (die.isHeld ? die : generateNewDie()))
			);
			setNumberOfRolls(numberOfRolls + 1);
		} else {
			setTenzies(false);
			setDice(allNewDice());
			setNumberOfRolls(0);
			setTime(0);
		}
	}

	const holdDice = id => {
		setIsRunning(true);
		setDice(oldDice =>
			oldDice.map(die => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	};

	const diceElements = dice.map(die => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className='title'>Tenzies</h1>
			<p className='instructions'>
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className='dice-container'>{diceElements}</div>
			<h3 className='roll-count'>Roll's count: {numberOfRolls}</h3>
			<Timer isRunning={isRunning} time={time} setTime={setTime} />
			<button className='roll-dice' onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	);
};

export default App;
