import { setAStateProp } from "store/actions";
//import store from "../../../store";

export const sampleFetch = (payload) => {
  let bodyJSON = payload ? payload : {};
  return (dispatch) => {
    return fetch("http://www.some.com/url", {
      method: "GET",
      body: bodyJSON,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          } else {
            return {};
          }
        },
        (error) => {
          if (error) {
            console.error(error);
            throw new Error(error);
          }
        }
      )
      .then((json) => {
        dispatch(setAStateProp(json));
      });
  };
};
