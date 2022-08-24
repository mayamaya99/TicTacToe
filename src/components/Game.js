import React, { useState } from "react";
import { calculateWinner } from "../assets";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;

    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const desc = move ? ` Go to move #${move}` : " Go to game start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />

      <div className="info-wrapper">
        <div>{renderMoves()}</div>
        <h3 className="p">
          {" "}
          {winner
            ? "The winner is " + winner + "  ! ! !"
            : "Next player: " + xO}{" "}
        </h3>
      </div>
    </>
  );
};

export default Game;
