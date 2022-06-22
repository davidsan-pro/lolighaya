const kunjunganTokoReducer = (state={}, action) => {
  switch (action.type) {
    case 'SET_TOKO':
      return {
        idRute: action.data.idRute,
        idToko: action.data.idToko,
        namaToko: action.data.namaToko,
      }; // !state
    case 'RESET':
      return {
        idRute: null,
        idToko: null,
        namaToko: null,
      }; // !state
    default: 
      // console.log('default');
      // state.asd = null;
      return state;
  }
}

export default kunjunganTokoReducer;