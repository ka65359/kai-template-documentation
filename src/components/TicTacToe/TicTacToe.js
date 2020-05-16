import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, pure, withState, withHandlers } from "recompose";
import {
  setGameHistory,
  setTurnNumber,
  setCurrentPlayer,
  clearGameHistory,
  clearTurnNumber,
  clearCurrentPlayer
} from "store/actions";
import * as constants from "../../constants/tictactoe";
// TODO: A loader
import TicTacToeBoard from "./TicTacToeBoard";
import "./TicTacToe.scss";

const onMouseDownHandler = () => {
  let gameBoardElem = document.getElementsByClassName("game");
  if (gameBoardElem.length) {
    gameBoardElem[0].classList.add("mouse-navigation");
    gameBoardElem[0].classList.remove("kbd-navigation");
  }
};

const onKeyDownHandler = (evt) => {
  if (evt.keyCode === 9) {
    let gameBoardElem = document.getElementsByClassName("game");
    if (gameBoardElem.length) {
      gameBoardElem.classList.add("kbd-navigation");
      gameBoardElem.classList.remove("mouse-navigation");
    }
  }
};

const onClickHandler = (evt) => {
  if (evt.target.tagName == "A" && evt.target.getAttribute("href") == "#") {
    evt.preventDefault();
  }
};

const mapDispatchToProps = {
  setGameHistory,
  setTurnNumber,
  setCurrentPlayer,
  clearGameHistory,
  clearTurnNumber,
  clearCurrentPlayer
};

const enhance = compose(
  pure,
  connect(
    (state) => ({
      history: state.ui.game.history,
      turnNumber: state.ui.game.turnNumber,
      currentPlayer: state.ui.game.currentPlayer
    }),
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      // subscribe to eventlisteners
      window.addEventListener("mousedown", onMouseDownHandler);
      window.addEventListener("keydown", onKeyDownHandler);
      window.addEventListener("click", onClickHandler);
    },
    componentDidMount() {},
    componentWillUnmount() {
      // remove eventlisteners
      window.removeEventListener("mousedown", onMouseDownHandler);
      window.removeEventListener("keydown", onKeyDownHandler);
      window.removeEventListener("click", onClickHandler);
    },
    shouldComponentUpdate(nextProps) {
      if (this.props !== nextProps) {
        // window.dispatchEvent(new CustomEvent("event-name", { detail: { nextProps } }));
        return true;
      }
    }
  }),
  withState("aLocalProp", "setLocalProp", null),
  withHandlers({
    onsetLocalProp: ({ setLocalProp }) => (obj) =>
      setLocalProp(() => {
        return obj;
      })
  })
);

export const getWinningPaths = (width) => {
  const MAX_WIDTH = 9; // TODO: move to constants
  if (width > MAX_WIDTH) {
    width = MAX_WIDTH;
  }
  let paths = [];

  const getRowPaths = (width) => {
    /*
      // TODO: tests
      width = 3
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    */
    let paths = [];
    let currPath = [];
    for (let row = 0; row < width; row++) {
      currPath = [];
      for (let col = 0; col < width; col++) {
        currPath.push(row * 3 + col);
      }
      paths.push(currPath);
    }
    return paths;
  };

  const getColumnPaths = (width) => {
    /*
      // TODO: tests
      width = 3
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    */
    let paths = [];
    let currPath = [];
    for (let row = 0; row < width; row++) {
      currPath = [];
      for (let col = 0; col < width; col++) {
        currPath.push(col * width + row);
      }
      paths.push(currPath);
    }
    return paths;
  };

  const getDiagonalPaths = (width) => {
    /*
      // TODO: tests
      width = 3
      [0, 4, 8],
      [2, 4, 6]
    */
    let paths = [];
    let currPath = [];
    for (let i = 0; i < width; i++) {
      currPath.push(i * (width - 1) + i);
    }
    paths.push(currPath);
    currPath = [];
    for (let i = 1; i <= width; i++) {
      currPath.push(i * (width - 1));
    }
    paths.push(currPath);
    return paths;
  };

  // a full row is a win
  paths = getRowPaths(width);
  // a full column is a win
  paths = paths.concat(getColumnPaths(width));
  // a diagonal line is a win
  paths = paths.concat(getDiagonalPaths(width));
  return paths;
};

/**
  This algorithm is checking all the possible ways to score
  three in a row and seeing if 3 in row exists.
**/
export const isWinner = (squares, width) => {
  let winningPaths = getWinningPaths(width);
  for (let i = 0; i < winningPaths.length; i++) {
    const [a, b, c] = winningPaths[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const TicTacToe = ({
  history,
  turnNumber,
  currentPlayer,
  setGameHistory,
  setTurnNumber,
  setCurrentPlayer,
  clearGameHistory,
  clearTurnNumber,
  clearCurrentPlayer
  //intl
}) => {
  const player1 = constants.PLAYER_1;
  const player2 = constants.PLAYER_2;
  const width = constants.WIDTH;

  let handleClick = (i, width) => {
    history = history.slice(0, turnNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (isWinner(squares, width) || squares[i]) {
      return;
    }
    squares[i] = currentPlayer;
    setGameHistory(
      history.concat([
        { squares, player: currentPlayer === player1 ? player2 : player1 }
      ])
    );
    setTurnNumber(history.length);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  };

  let jumpTo = (step, history) => {
    if (step === 0) {
      clearGameHistory();
      clearTurnNumber();
      clearCurrentPlayer();
    } else {
      setTurnNumber(step);
      setCurrentPlayer(history.player);
    }
  };

  const current = history[turnNumber];
  const winner = isWinner(current.squares, width);
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Restart";
    return (
      <li
        key={move}
        style={{ display: move == history.length ? "none" : "visible" }}>
        <button onClick={() => jumpTo(move, history[move])}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + currentPlayer;
  }

  return (
    <div className="game">
      <div className="game-board">
        <TicTacToeBoard
          squares={current.squares}
          onClick={(i) => handleClick(i, width)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

//export default injectIntl(enhance(TicTacToe));
export default enhance(TicTacToe);
