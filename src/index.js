import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bulma/css/bulma.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/index.css";
import "./config.js";

import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  allReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// // for redux:
// //STORE -> GLOBALIZED STATE (ACTS LIKE A DATABASE BUT FOR STATES)

// //ACTION -> DESCRIPTION OF WHAT YOU WANT TO DO (e.g. ADD, INCREMENT, etc)
// // A FUNCTION THAT RETURNS AN OBJECT
// const increment = () => {
//   return {
//     type: 'INCREMENT'
//   }
// }
// const decrement = () => {
//   return {
//     type: 'DECREMENT'
//   }
// }

// //REDUCER -> DESCRIBES HOW THE ACTION TRANSFORMS THE STATE INTO THE NEXT STATE
// // WHEN AN ACTION IS CALLED, THE REDUCER CHECKS WHICH ACTION YOU DID,
// // AND BASED ON THE ACTION IT'S GOING TO MODIFY THE STORE
// const counter = (state=0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state+1
//     case 'DECREMENT':
//       return state-1
//   }
// }

// let store = createStore(counter);

// //Display it in the console
// store.subscribe(() => console.log(state.getState()));

// //DISPATCH -> THE WAY WE CAN ACTUALLY EXECUTE THAT ACTION
// store.displace(increment());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
