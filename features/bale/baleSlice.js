import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiService";



const initialState={
    baleList:[],
    baleMaterial:[],
    baleDropdownList:[],
    baleData:[],
    orderData:[],
    baleById:[],
    postData:[],
    isLoading:false,
    message: ""
}
export const getBaleList=createAsyncThunk('bale/baleList',async(data,thunkApi)=>{
    try{
      const res=await api.get('bale')
      console.log(res.data)
      return res.data
    }
    catch(e){
        return thunkApi.rejectWithValue(e.message)
    }
})
export const getBaleById=createAsyncThunk('bale/baleById',async(id,thunkApi)=>{
  try{
    const res=await api.get(`bale/${id}`)
    console.log(res.data)
    return res.data
  }
  catch(e){
      return thunkApi.rejectWithValue(e.message)
  }
})
export const getbaleMaterial = createAsyncThunk(
    'bale/baleMaterial',
    async (_, thunkApi) => {
      try {
        const res = await api.get('bale/baleMaterial');
        return res.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    },
  );
  export const getbaleDropdown = createAsyncThunk(
    'bale/baleDropdown',
    async (_, thunkApi) => {
      try {
        const res = await api.get('bale/baleDropdownList');
        return res.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    },
  );
  export const balePostData = createAsyncThunk(
    'bale/postData',
    async (data, thunkApi) => {
      try {
        console.log('post data',data)
        const res = await api.post('bale/postData',data);
        return res.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e.message);
      }
    },
  );
export const baleSlice=createSlice({
    name:'baleList',
    initialState,
    reducers:{
      addMaterial: (state, action) => {
        state.orderData = {...state.orderData, batchMaterial: action.payload};
      },
      addOperator: (state, action) => {
        state.orderData = {...state.orderData, operator: action.payload};
      },
      addBaleQuantity: (state, action) => {
        state.orderData = {...state.orderData, baleQuantity: action.payload};
      },

      addMaterialType: (state, action) => {
        state.orderData = {...state.orderData, baleMaterial: action.payload};
      },
      addOperatorSign: (state, action) => {
        state.orderData = {...state.orderData, operatorSignature: action.payload};
      },
      addSupervisorSign: (state, action) => {
        state.orderData = {...state.orderData, supervisorSignature: action.payload};
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(getBaleList.pending,(state)=>{
          console.log("get bale list")
            state.isLoading=true
        })
        .addCase(getBaleList.fulfilled,(state,action)=>{
          console.log('get bale list fullfilled')
            state.isLoading=false
            state.isSuccess=true
            state.baleList=action.payload
        })
        .addCase(getBaleList.rejected,(state,action)=>{
          console.log(action.payload)
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.baleList=[]
        })
        .addCase(getbaleMaterial.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getbaleMaterial.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.baleMaterial=action.payload
        })
        .addCase(getbaleMaterial.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.baleMaterial=[]
        })
        .addCase(getbaleDropdown.pending,(state)=>{
          state.isLoading=true
      })
      .addCase(getbaleDropdown.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isSuccess=true
          state.baleDropdownList=action.payload
      })
      .addCase(getbaleDropdown.rejected,(state,action)=>{
          state.isLoading=false
          state.isError=true
          state.message=action.payload
          state.baleDropdownList=[]
      })
      .addCase(balePostData.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(balePostData.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.orderData=action.payload
    })
    .addCase(balePostData.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.orderData=[]
    })
      .addCase(getBaleById.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(getBaleById.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.baleById=action.payload
    })
    .addCase(getBaleById.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.baleById=[]
    })
    }
})

export const {addOperatorSign,addSupervisorSign,addMaterial,addBaleQuantity,addOperator,addMaterialType}= baleSlice.actions;

export default baleSlice.reducer;