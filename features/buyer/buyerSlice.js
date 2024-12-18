import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiService";
import axios from "axios";

const initialState={
    isLoading:false,
    isError:false,
    buyerList:[],
    buyerById:[],
    orderData:[],
    buyerPostData:[],
    message: ""
}
export const getBuyerList=createAsyncThunk('buyer/buyerList',async(_,thunkApi)=>{
    try{
        const response = await api.get('buyer');
        return response.data;
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const buyerPost=createAsyncThunk('buyer/buyerPost',async(data,thunkApi)=>{
    try{
        console.log('data',data)
     
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (data.data.buyer_image) {
          console.log('............................')
          formData.append('buyer_image', {
            uri: `file://${data.data.buyer_image}`,
            name: 'photo.jpg',
            type: 'image/jpeg',
          });
        }
        if (data.data.id_proof_image) {
          
            formData.append('buyer_id_proof_image', {
              uri: `file://${data.data.id_proof_image}`,
              name: 'photo.jpg',
              type: 'image/jpeg',
            });
          }
        // for (let pair of formData.entries()) {
        //   console.log(pair[0]+ ', ' + pair[1]);
        // }
        // console.log("filePath", filePath);
        
        console.log("data",formData)
        
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        // response = await axios.post('http://13.202.98.144:2000/api/buyer', formData,config);
  
        const response = await api.post('buyer',formData,config);
        return response.data;
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getBuyerById=createAsyncThunk('buyer/buyerById',async(id,thunkApi)=>{
    try{
    const res=await api.get(`buyer/${id}`);
      console.log('buyer',res.data)
    return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const buyerSlice=createSlice({
    name:'buyer',
    initialState,
    reducers:{
        addBuyerSign: (state, action) => {
            state.orderData = {...state.orderData, buyerSignature: action.payload};
          },
        addData: (state, action) => {
            state.orderData = {...state.orderData, data: action.payload};
          }
    },
    extraReducers:(builder)=>{
        builder.addCase(buyerPost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(buyerPost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.buyerPostData=action.payload
        })
        .addCase(buyerPost.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.buyerPostData=[]
        })
        .addCase(getBuyerList.pending,(state)=>{
          state.isLoading=true
      })
      .addCase(getBuyerList.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isSuccess=true
          state.buyerList=action.payload
      })
      .addCase(getBuyerList.rejected,(state,action)=>{
          state.isLoading=false
          state.isError=true
          state.message=action.payload
          state.buyerList=[]
      })
        .addCase(getBuyerById.pending,(state)=>{
          state.isLoading=true
      })
      .addCase(getBuyerById.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isSuccess=true
          state.buyerById=action.payload
      })
      .addCase(getBuyerById.rejected,(state,action)=>{
          state.isLoading=false
          state.isError=true
          state.message=action.payload
          state.buyerById=[]
      })
       
    }
})
export const { addBuyerSign,addData} = buyerSlice.actions;
    
export default buyerSlice.reducer;
