/**
 * @module TicTacToe
 * @description A module that builds a TicTacToe game.
 * @exports TicTacToe
 * @author Kai
 * @version 1.2.3
 *
 * @typedef {Object} TicTacToe
 *
 * @property {Object[]} history - An array of boards
 *  ({@link width} by {width} array of {history.squares})
 * @typedef {('X'|'O'|null)} PlayerName - the player's name
 * @property {PlayerName[]} history.squares - an array of the square's contents
 * @property {string} history.player - The current player for that turn
 * @property {string} currentPlayer - The name of the player who's turn it is
 * @property {function} setGameHistory - Update the game history with a new turn's board
 * @property {function} setTurnNumber - Update the turn count
 * @property {function} setCurrentPlayer - Change the current player
 * @property {function} clearGameHistory - Reset game history
 * @property {function} clearTurnNumber - Set turn count back to 0
 * @property {function} clearCurrentPlayer - Reset player back to default
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, lifecycle, pure, withState, withHandlers } from "recompose";
import { object, text, number } from "@storybook/addon-knobs";
import {
  setGameHistory,
  setTurnNumber,
  setCurrentPlayer,
  clearGameHistory,
  clearTurnNumber,
  clearCurrentPlayer
} from "store/actions";
import * as constants from "../../constants/tictactoe";
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

  const getRowPaths = () => {
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
        currPath.push(row * width + col);
      }
      paths.push(currPath);
    }
    return paths;
  };

  const getColumnPaths = () => {
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

  const getDiagonalPaths = () => {
    /*
      // TODO: tests
      width = 3
      [0, 4, 8],
      [2, 4, 6]
      0,5,10,15
    */
    let paths = [];
    let currPath = [];
    for (let i = 0; i < width; i++) {
      currPath.push(i * (width + 1));
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
  paths = getRowPaths();
  // a full column is a win
  paths = paths.concat(getColumnPaths());
  // a diagonal line is a win
  paths = paths.concat(getDiagonalPaths());
  return paths;
};

/**
 * @function isWinner
 * @description This algorithm is checking all the possible ways to score
 * three in a row and seeing if 3 in row exists.
 * @param {Array} squares - description
 * @param {@link width} width - the WIDTH
 * *
 * @returns {(string|null)} The player's name if there is a winner, otherwise null.
 */
export const isWinner = (squares, width) => {
  const winningPaths = getWinningPaths(width);
  if (!winningPaths.length) {
    return null;
  }
  let currPath = [];
  let win = false;
  for (let i = 0; i < winningPaths.length; i++) {
    currPath = winningPaths[i];
    win = true;
    for (let j = 0; j < currPath.length; j++) {
      if (squares[currPath[0]] !== squares[currPath[j]]) {
        win = false;
        break;
      }
    }
    if (win) {
      break;
    }
  }
  if (win) {
    return squares[currPath[0]];
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
  /**
   * @const player1 - Player one's name
   * @type {string}
   * @default X
   */
  const player1 = text("Player 1", constants.PLAYER_1);
  /**
   * @const player2 - Player two's name
   * @type {string}
   * @default O
   */
  const player2 = text("Player 2", constants.PLAYER_2);
  /**
   * @const width - Dimensions of the board
   * @typedef {number} width
   * @type {number}
   * @default 3
   */
  const width = number("width", constants.WIDTH);

  /**
   * @function handleClick - Handle a square being clicked
   * @callback onClick
   * @param {number} i - ...
   * @param {@link width} [width] - TODO passed constant oops remove Number of squares per side of the board
   */
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

  const current = object("current board", history[turnNumber]);
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
    status = "Next player: " + text("currentPlayer", currentPlayer);
  }

  return (
    <div className="kai-tictactoe-game game">
      <div className="game-board">
        <TicTacToeBoard
          squares={current.squares}
          onClick={(i) => handleClick(i, width)}
        />
      </div>
      <div className="game-info">
        <div>{text("status", status)}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

TicTacToe.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      squares: PropTypes.array.isRequired,
      player: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  turnNumber: PropTypes.number.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  setGameHistory: PropTypes.func.isRequired,
  setTurnNumber: PropTypes.func.isRequired,
  setCurrentPlayer: PropTypes.func.isRequired,
  clearGameHistory: PropTypes.func.isRequired,
  clearTurnNumber: PropTypes.func.isRequired,
  clearCurrentPlayer: PropTypes.func.isRequired
  //intl
};

//export default injectIntl(enhance(TicTacToe));
export const StorybookTicTacToe = TicTacToe;
export default enhance(TicTacToe);
