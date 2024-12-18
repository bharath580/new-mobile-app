import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  authentication: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async thunk for checking authentication
export const checkAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async (_, thunkAPI) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        if (user[0]?.access_token) {
          return user; // Return user data if authenticated
        }
      }
      return null; // Return null if no valid user is found
    } catch (error) {
      console.error("Error checking authentication:", error);
      return thunkAPI.rejectWithValue("Failed to check authentication");
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/loginForMobile",
  async (user, thunkAPI) => {
    try {
      const response = await api.post("/user/loginForMobile", user);

      // Save user data to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(response.data));

      return response.data; // Return user data
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for logout
export const Logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await AsyncStorage.removeItem("user"); // Clear user data from AsyncStorage
    return null; // Reset user to null
  } catch (error) {
    console.error("Error during logout:", error);
    return thunkAPI.rejectWithValue("Failed to logout");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authentication = !!action.payload;
      })
      .addCase(checkAuthentication.rejected, (state) => {
        state.user = null;
        state.authentication = false;
      })
      .addCase(login.pending, (state) => {
        console.log('pending')
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('fulfilled')

        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.authentication = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('rejected')

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.user = null;
        state.authentication = false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
