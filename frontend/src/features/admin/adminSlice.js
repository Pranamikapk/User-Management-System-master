import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const safeJSONParse = (item) => {
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  };

const storedAdmin = localStorage.getItem("admin");
const admin = storedAdmin && storedAdmin !== "undefined" ? safeJSONParse(storedAdmin) : null;

const initialState = {
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    users: [] 
}

//Admin login
export const login = createAsyncThunk(
    "adminAuth/login",
    async(admin,thunkAPI) =>{
        try {
            console.log("Slice",admin);
            return await adminService.login(admin)
        } catch (error) {
            const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

//logout
export const logout = createAsyncThunk("adminAuth/logout",async()=>{
    adminService.logout()
})

//get all users
export const getAllusers = createAsyncThunk(
    "adminAuth/getAllusers",
    async(_,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().adminAuth.admin.token
            const response = await adminService.getAllusers(token)
            console.log("response",response);
            return response
        } catch (error) {
            const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

export const editUser = createAsyncThunk(
    "adminAuth/editUser",
    async({userId , name , email},thunkAPI) =>{
        try {
            const token = thunkAPI.getState().adminAuth.admin.token
            const response = await adminService.editUser(token, userId , name, email)
            return response.data
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const blockUser = createAsyncThunk(
    "adminAuth/userBlock",
    async(userId,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().adminAuth.admin.token
            return await adminService.blockUser(userId,token)
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const addNewUser = createAsyncThunk(
    'adminAuth/addUser',
    async(userData,thunkAPI)=>{
        try {
            const token = thunkAPI.getState().adminAuth.admin.token
            const response = await adminService.createUser(token,userData)
            return response.data
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const adminSlice = createSlice({
    name : 'adminAuth',
    initialState,
    reducers: {
        reset: (state) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
        })
        .addCase(login.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.admin = null
            console.log("Rejected", state);
        })
        .addCase(logout.fulfilled,(state)=>{
            state.admin = null
            state.isError = false
            state.isSuccess = false
            state.message = ''
        })
        .addCase(getAllusers.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllusers.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isError = false
            state.users = action.payload
        })
        .addCase(editUser.pending ,(state) =>{
            state.isLoading = true
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            // state.users = action.payload.users || []
            const updatedUser = action.payload;
            if (updatedUser && updatedUser._id) {
                const index = state.users.findIndex(user => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            }
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload.users
        })
        .addCase(blockUser.pending ,(state) =>{
            state.isLoading = true
        })
        .addCase(blockUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload.users
        })
        .addCase(blockUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(addNewUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addNewUser.fulfilled ,(state , action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.users.push(action.payload)
        })
        .addCase(addNewUser.rejected ,(state ,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = adminSlice.actions
export default adminSlice.reducer