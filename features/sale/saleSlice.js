import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiService";



const initialState={
    saleList:[],
    buyerList:[],
    orderData:[],
    saleById:[],
    saleDropdownList:[],
    isLoading:false,
    message: ""
}

export const getSaleList=createAsyncThunk('sale/saleList',async(data,thunkApi)=>{
    try{
      const res=await api.get('sale')
      console.log(res.data)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getBuyerList=createAsyncThunk('sale/buyerList',async(data,thunkApi)=>{
    try{
      const res=await api.get('sale/buyer')
      console.log(res.data)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getSaleDropdownList=createAsyncThunk('sale/saleDropdownList',async(data,thunkApi)=>{
    try{
      const res=await api.get('sale/saleDropdownList')
      console.log(res.data)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const postSaleData=createAsyncThunk('sale/postData',async(data,thunkApi)=>{
    try{
      const res=await api.post('sale/postData',data)
      console.log(res.data)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getSaleById=createAsyncThunk('sale/saleById',async(id,thunkApi)=>{
    try{
      const res=await api.get(`sale/mobile/${id}`)
      console.log(res.data)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const saleSlice=createSlice({
    name:'saleList',
    initialState,
    reducers:{
        addBuyer: (state, action) => {
            state.orderData = {...state.orderData, buyer: action.payload};
          },
        addVehicle: (state, action) => {
            state.orderData = {...state.orderData, vehicle: action.payload};
          },
        addMaterial: (state, action) => {
            state.orderData = {...state.orderData, materials: action.payload};
          },
        addBuyerSign: (state, action) => {
            state.orderData = {...state.orderData, buyerSign: action.payload};
          },
        addSupervisorSign: (state, action) => {
            state.orderData = {...state.orderData, supervisorSign: action.payload};
          }
    },
    extraReducers:(builder)=>{
        builder.addCase(getSaleList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSaleList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.saleList=action.payload
        })
        .addCase(getSaleList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.saleList=[]
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
        .addCase(getSaleDropdownList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSaleDropdownList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.saleDropdownList=action.payload
        })
        .addCase(getSaleDropdownList.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.saleDropdownList=[]
        })
        .addCase(postSaleData.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(postSaleData.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.orderData=action.payload
        })
        .addCase(postSaleData.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.orderData=[]
        })
        .addCase(getSaleById.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSaleById.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.saleById=action.payload
        })
        .addCase(getSaleById.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.saleById=[]
        })
    }
})

export const { addMaterial,addBuyer,addVehicle,addBuyerSign,addSupervisorSign} = saleSlice.actions;

export default saleSlice.reducer;