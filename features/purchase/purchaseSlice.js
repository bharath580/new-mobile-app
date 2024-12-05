import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../api/apiService";

const initialState={
  purchaseList: [],
  dropdownDetails: [],
  orderData: [],
  orderById:[],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
}
export const getPurchaseList=createAsyncThunk('purchase/purchaseList',async(data,thunkApi)=>{
    try{
      const res=await api.get('purchase')
      // console.log('res',res.data)
    //   console.log(res)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getDropdownDetails=createAsyncThunk('purchase/dropdownDetails',async(data,thunkApi)=>{
    try{
      const res=await api.get('purchase/getDetailsForNewPurchase')
      // console.log('res',res.data)
    //   console.log(res)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getOrderById=createAsyncThunk('purchase/getById',async(data,thunkApi)=>{
  try{
    const res=await api.get(`purchase/${data}`)
    // console.log('res',res.data)
  //   console.log(res)
    return res.data
  }
  catch(e){
      return thunkApi.rejectWithValue(e.message)
  }
})
export const postPurchase = createAsyncThunk(
  'purchase/postOrder',
  async (data, thunkApi) => {
    let response;
    try {
     

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (data.photoUri) {
        var filePath = data.photoUri;
        formData.append('photo', {
          uri: `file://${data.photoUri}`,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      }
      // for (let pair of formData.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]);
      // }
      console.log("filePath", filePath);
      
      console.log("data",formData)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      response = await axios.post('http://192.168.1.2:2000/api/purchase', formData,config);

      console.log('Response data:', response.data);
      return response.data;  // Make sure to return response data here

    } catch (error) {
      console.error('Error:', error);
      return thunkApi.rejectWithValue(error.message);  // Reject with error message if an error occurs
    }
  }
);

export const purchaseSlice=createSlice({
    name:'purchaseOrderList',
    initialState,
    reducers:{
          PurchaseDetail: (state, action) => {
            state.orderData = {...state.orderData, purchaseDetail: action.payload};
          },
          addMaterial: (state, action) => {
            state.orderData = {...state.orderData, materials: action.payload};
          },
          addDriverSign: (state, action) => {
            state.orderData = {...state.orderData, driverSignature: action.payload};
          },
          addSupervisorSign: (state, action) => {
            state.orderData = {...state.orderData, supervisorSignature: action.payload};
          },
          addSupplierSign: (state, action) => {
            state.orderData = {...state.orderData, supplierSignature: action.payload};
          },
          addPhotoUri: (state, action) => {
            state.orderData = {...state.orderData, photoUri: action.payload};
          },
          reset:(state,action)=>{
            state.purchaseList= []
            state.dropdownDetails= []
            state.orderData= []
            state.orderById=[]
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(getPurchaseList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPurchaseList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.purchaseList=action.payload
        })
        .addCase(getPurchaseList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.purchaseList=[]
        })
       .addCase(getDropdownDetails.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getDropdownDetails.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.dropdownDetails=action.payload
        })
        .addCase(getDropdownDetails.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.dropdownDetails=[]
        })
        .addCase(postPurchase.pending, state => {
          console.log("post pending")
          state.isLoading = true;
        })
        .addCase(postPurchase.fulfilled, (state, action) => {
          console.log("post fullfilled")
          state.isLoading = false;
          state.isSuccess = true;
          state.orderData = [];
          state.message = action.payload;
        })
        .addCase(postPurchase.rejected, (state, action) => {
          console.log("post rejected")
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.orderData = [];
        })
        .addCase(getOrderById.pending, state => {
          console.log("get by id pending")
          state.isLoading = true;
        })
        .addCase(getOrderById.fulfilled, (state, action) => {
          console.log("get by id fullfilled")
          state.isLoading = false;
          state.isSuccess = true;
          state.orderById = action.payload;
        })
        .addCase(getOrderById.rejected, (state, action) => {
          console.log("get by id rejected")
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.orderById = [];
        })
    }
})

export const {PurchaseDetail, addMaterial, addSupervisorSign, addDriverSign,addSupplierSign,addPhotoUri} = purchaseSlice.actions;
export default purchaseSlice.reducer;