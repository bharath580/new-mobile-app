import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiService";

const initialState={
    isLoading:false,
    isError:false,
    segregationBatchList:[],
    segregationBatchById:[],
    segregationPostData:[],
    message: ""
}
export const getSegregationBatchList=createAsyncThunk('segregation/segregationBatchList',async(_,thunkApi)=>{
    try{
        const response = await api.get('segregation/batchList');
        return response.data;
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const segregationPost=createAsyncThunk('segregation/segregationPost',async(data,thunkApi)=>{
    try{
        const response = await api.post('segregation/batch',data);
        return response.data;
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getSegregationBatchById=createAsyncThunk('segregation/segregationBatchById',async(id,thunkApi)=>{
    try{
    const res=await api.get(`segregation/batch/${id}`);
      console.log('segregationBatchList',res.data)
    return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const segregationSlice=createSlice({
    name:'segregation',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getSegregationBatchList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSegregationBatchList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.segregationBatchList=action.payload
        })
        .addCase(getSegregationBatchList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.segregationBatchList=[]
        })
        .addCase(getSegregationBatchById.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSegregationBatchById.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.segregationBatchById=action.payload
        })
        .addCase(getSegregationBatchById.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.segregationBatchById=[]
        })
        .addCase(segregationPost.pending,(state)=>{
            console.log("post pending")
            state.isLoading=true
        })
        .addCase(segregationPost.fulfilled,(state,action)=>{
            console.log("post fullfilled")
            state.isLoading=false
            state.isSuccess=true
            state.segregationPostData=action.payload
        })
        .addCase(segregationPost.rejected,(state,action)=>{
            console.log("post rejected")
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.segregationPostData=[]
        })
    }
})
    
export default segregationSlice.reducer;
