import React from "react";
import TicTacToe from "../../components/TicTacToe";

export const TicTacToePage = ({
  aStateProp
  // intl
}) => {
  let loading = <div></div>;
  if (aStateProp) {
    // TODO: insert loader tag
    loading = <div className="kai-loading-class"></div>;
  }
  // TODO: intl <TicTacToe intl={intl} />
  return (
    <div className="kai-tictactoepage">
      <TicTacToe />
      {loading}
    </div>
  );
};

export default TicTacToePage;
