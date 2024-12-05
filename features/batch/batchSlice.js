import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../api/apiService";

const initialState={
  batchList: [],
  materialList: [],
  batchPostData: [],
  batchById: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
}
export const postBatchData = createAsyncThunk(
  'batch/postData',
  async (data, thunkApi) => {
    try {
      const res = await api.post('batch',data)
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
export const getBatchList=createAsyncThunk('batch/batchList',async(data,thunkApi)=>{
    try{
      const res=await api.get('batch')
      console.log('res',res.data)
    //   console.log(res)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getBatchById=createAsyncThunk('batch/getBatchById',async(data,thunkApi)=>{
  try{
    const res=await api.get(`batch/batchdetail/${data}`)
    // console.log('res',res.data)
  //   console.log(res)
    return res.data
  }
  catch(e){
      return thunkApi.rejectWithValue(e.message)
  }
})
export const getMaterialList=createAsyncThunk('batch/materialList',async(data,thunkApi)=>{
    try{
      const res=await api.get('batch/materialList')
      console.log('res',res.data)
    //   console.log(res)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})

export const batchSlice=createSlice({
    name:'batch',
    initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder.addCase(getBatchList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getBatchList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.batchList=action.payload
        })
        .addCase(getBatchList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.batchList=[]
        })
        .addCase(getMaterialList.pending, state => {
            state.isLoading = true;
          })
          .addCase(getMaterialList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.materialList = action.payload;
          })
          .addCase(getMaterialList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.materialList = [];
          })
          .addCase(postBatchData.pending, state => {
            state.isLoading = true;
          })
          .addCase(postBatchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.batchPostData = action.payload;
          })
          .addCase(postBatchData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.batchPostData = [];
          })
          .addCase(getBatchById.pending, state => {
            state.isLoading = true;
          })
          .addCase(getBatchById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.batchById = action.payload;
          })
          .addCase(getBatchById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.batchById = [];
          })
    }
})

export default batchSlice.reducer;