import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : 'user',
    initialState : {
        id:"",
        name:"",
        mobile:"",
        email:"",
        image:"",
        is_admin:""
    },
    reducers : {
        setUserDetails:(state,action)=>{
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.mobile = action.payload.mobile
            state.email = action.payload.email;
            state.image = action.payload.image;
        },
        logoutUser:(state)=>{
            state.id = ''
            state.name = ''
            state.mobile = ''
            state.email = ''
            state.image = ''    
        }
    }

})

export const {setUserDetails,logoutUser} = userSlice.actions

export default userSlice.reducer