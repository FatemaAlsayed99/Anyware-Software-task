import { createSlice } from '@reduxjs/toolkit';



const authSlice = createSlice ({
   name:"Authenticated",
   initialState:{Authenticated:false},
   reducers:{
    changeAuthenticated: function(state, action){
      state.Authenticated=action.payload
    }
   }

});

export const { changeAuthenticated } = authSlice.actions;
export default authSlice.reducer