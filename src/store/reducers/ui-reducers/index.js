import { combineReducers } from "redux";
import sample from "./sample-reducer";
import game from "./tictactoe-reducer";

export default combineReducers({
  sample,
  game
});
