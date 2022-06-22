const bukuNotaReducer = (state={}, action) => {
  switch (action.type) {
    case 'ADD_NEW_ITEM':
      console.log('add_new_item', action.data);
      return state; // !state
    case 'REMOVE_ITEM':
      console.log('remove_item', action.data);
      return state; // !state
      default: 
      console.log('default', action.data);
      return state;
  }
}

export default bukuNotaReducer;