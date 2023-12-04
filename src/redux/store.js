import {configureStore} from '@reduxjs/toolkit';
import usuarioSlice from './usuarioReducer';
import msgSlice from './msgReducer';

const store = configureStore({
    reducer:{
        usuarioSlice: usuarioSlice,
        msg: msgSlice,
    }
});

export default store;