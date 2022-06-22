export const increment = () => {
  return {
    type: 'INCREMENT'
  };
}
export const decrement = () => {
  return {
    type: 'DECREMENT'
  };
}
export const actionLogin = (id, username, datetime) => {
  return {
    type: 'SIGN_IN',
    data: {
      id: id,
      username: username,
      datetime: datetime
    }
  }
}
export const actionLogout = () => {
  return {
    type: 'SIGN_OUT'
  }
}
export const addNewItem = (idRute, idToko, idBarang) => {
  return {
    type: 'ADD_NEW_ITEM',
    data: {
      idRute: idRute,
      idToko: idToko,
      idBarang: idBarang,
    }
  }
}
export const setKunjunganToko = (idRute, idToko, namaToko) => {
  return {
    type: 'ADD_NEW_ITEM',
    data: {
      idRute: idRute,
      idToko: idToko,
      namaToko: namaToko,
    }
  }
}
