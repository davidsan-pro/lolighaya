const loggedReducer = (state={}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      console.log(action.data);
      return {
        id: action.data.id,
        username: action.data.username,
        datetime: action.data.datetime
      }; // !state
    case 'SIGN_OUT':
      return {}; // !state
    default: 
      return {};
  }
}

export default loggedReducer;