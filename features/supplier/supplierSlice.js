import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiService";
import axios from "axios";

const initialState={
    isLoading:false,
    isError:false,
    supplierList:[],
    supplierById:[],
    orderData:[],
    supplierPostData:[],
    message: ""
}
export const getSupplierList=createAsyncThunk('supplier/supplierList',async(_,thunkApi)=>{
    try{
        const response = await api.get('supplier');
        return response.data;
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const supplierPost=createAsyncThunk('supplier/supplierPost',async(data,thunkApi)=>{
    try{
        console.log('data',data.data.supplier_image)
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (data.data.supplier_image) {
          console.log('............................')
          formData.append('supplier_image', {
            uri: `file://${data.data.supplier_image}`,
            name: 'photo.jpg',
            type: 'image/jpeg',
          });
        }
        if (data.data.id_proof_image) {
          
            formData.append('id_proof_image', {
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
        // response = await axios.post('http://13.202.98.144:2000/api/supplier', formData,config);
  
        const response = await api.post('supplier',formData,config);
        return response.data;
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getSupplierById=createAsyncThunk('supplier/supplierById',async(id,thunkApi)=>{
    try{
    const res=await api.get(`supplier/${id}`);
      console.log('supplier',res.data)
    return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const supplierSlice=createSlice({
    name:'supplier',
    initialState,
    reducers:{
        addSupplierSign: (state, action) => {
            state.orderData = {...state.orderData, supplierSignature: action.payload};
          },
        addData: (state, action) => {
            state.orderData = {...state.orderData, data: action.payload};
          }
    },
    extraReducers:(builder)=>{
        builder.addCase(supplierPost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(supplierPost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.supplierPostData=action.payload
        })
        .addCase(supplierPost.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.supplierPostData=[]
        })
        .addCase(getSupplierList.pending,(state)=>{
          state.isLoading=true
      })
      .addCase(getSupplierList.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isSuccess=true
          state.supplierList=action.payload
      })
      .addCase(getSupplierList.rejected,(state,action)=>{
          state.isLoading=false
          state.isError=true
          state.message=action.payload
          state.supplierList=[]
      })
        .addCase(getSupplierById.pending,(state)=>{
          state.isLoading=true
      })
      .addCase(getSupplierById.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isSuccess=true
          state.supplierById=action.payload
      })
      .addCase(getSupplierById.rejected,(state,action)=>{
          state.isLoading=false
          state.isError=true
          state.message=action.payload
          state.supplierById=[]
      })
       
    }
})
export const { addSupplierSign,addData} = supplierSlice.actions;
    
export default supplierSlice.reducer;
