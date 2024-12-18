import { configureStore } from "@reduxjs/toolkit";
import  purchaseSlice  from "../features/purchase/purchaseSlice";
import  batchSlice  from "../features/batch/batchSlice";
import  segregationSlice  from "../features/segregation/segregationSlice";
import  baleSlice  from "../features/bale/baleSlice";
import  saleSlice  from "../features/sale/saleSlice";
import  supplierSlice  from "../features/supplier/supplierSlice";
import  buyerSlice  from "../features/buyer/buyerSlice";
import  authSlice  from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
      purchase:purchaseSlice,
      batch:batchSlice,
      segregation:segregationSlice,
      bale:baleSlice,
      sale:saleSlice,
      supplier:supplierSlice,
      buyer:buyerSlice,
      auth:authSlice
    },
    
  })