import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from "./userService";
import {toast} from "react-toastify";


export  const registerUser = createAsyncThunk(
    "auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    }
    catch (error) {
        return  thunkAPI.rejectWithValue(error)
    }
})

export  const loginUser = createAsyncThunk(
    "auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    }
    catch (error) {
        return  thunkAPI.rejectWithValue(error)
    }
})

export const getUserProductWishlist = createAsyncThunk("user/wishlist",
    async (thunkAPI) => {
    try {
        return await authService.getUserWishlist();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    })
export const addProductToCart = createAsyncThunk("user/cart/add",
    async (cartData, thunkAPI) => {
        try {
            return await authService.addToCart(cartData);
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })

export const getUserCart = createAsyncThunk("user/cart/get",
    async (cartData, thunkAPI) => {
        try {
            return await authService.getCart();
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })
export const deleteCartProduct = createAsyncThunk("user/cart/product/delete",
    async (id, thunkAPI) => {
        try {
            return await authService.removeProductFromCart(id);
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })

export const updateCartProduct = createAsyncThunk("user/cart/product/update",
    async (cartDetail, thunkAPI) => {
        try {
            return await authService.updateProductFromCart(cartDetail);
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })
export const createOrderUser = createAsyncThunk("user/order/create",
    async(order, thunkAPI) => {
        try {
            return await authService.createOrder(order);
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

})
const getCustomerfromLocalStorage = localStorage.getItem("customer") ?
    JSON.parse(localStorage.getItem("customer")) : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.info("User Created Successfully")
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.info(action.error)
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    console.log(action.payload);
                    localStorage.setItem("customer",  JSON.stringify(action.payload))
                    toast.info("User Logged In Successfully")
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.info(action.error)
                }
            })
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess) {
                  toast.success("Product Added To Cart")
                }

            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;

            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Deleted  From Cart Successfully");
                }

            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess ==false) {
                    toast.error("Something Wrong!");
                }
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if (state.isSuccess) {
                    //toast.success("Product Updated  From Cart Successfully");
                }

            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess ==false) {
                    toast.error("Something Wrong!");
                }
            })
            .addCase(createOrderUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrderUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(createOrderUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    }
})

export default  authSlice.reducer;