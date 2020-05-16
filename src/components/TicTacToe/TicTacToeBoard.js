import React from "react";
import PropTypes from "prop-types";
import * as constants from "../../constants/tictactoe";

const Square = ({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const TicTacToeBoard = ({ squares, onClick }) => {
  const width = constants.WIDTH;
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  const buildRow = (startPos) => {
    return (
      <div className="board-row">
        {Array(constants.WIDTH)
          .fill(null)
          .map((item, index) => {
            return renderSquare(startPos + index);
          })}
      </div>
    );
  };

  const buildBoard = () => {
    return (
      <div>
        {Array(constants.WIDTH)
          .fill(null)
          .map((item, index) => {
            return buildRow(width * index);
          })}
      </div>
    );
  };

  return <div>{buildBoard()}</div>;
};

TicTacToeBoard.propTypes = {
  squares: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TicTacToeBoard;
