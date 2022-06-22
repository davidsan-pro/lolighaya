import counterReducer from './counter';
import isLoggedReducer from './isLogged';
import bukuNotaReducer from './bukuNota';
import kunjunganTokoReducer from './kunjunganToko';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: isLoggedReducer,
  bukuNota: bukuNotaReducer,
  kunjunganToko: kunjunganTokoReducer,
});

export default allReducers;