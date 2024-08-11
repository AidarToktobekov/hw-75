import { createSlice } from '@reduxjs/toolkit';
import {encode, decode} from "./cipherThunk.ts";

export interface cipherState{
    encode: string;
    decode: string;
    itemsFetching: boolean;
}

const initialState: cipherState={
    encode: '',
    decode: '',
    itemsFetching: false,
}

export const cipherSlice  = createSlice({
    name: 'cipher',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(encode.pending, (state)=>{
            state.itemsFetching = true;
        }).addCase(encode.fulfilled, (state, {payload:decode})=>{
            state.itemsFetching = true;
            state.encode  = decode
        }).addCase(encode.rejected, (state)=>{
            state.itemsFetching = false;
        })
        builder.addCase(decode.pending, (state)=>{
            state.itemsFetching = true;
        }).addCase(decode.fulfilled, (state, {payload:encode})=>{
            state.itemsFetching = true;
            state.decode = encode;
        }).addCase(decode.rejected, (state)=>{
            state.itemsFetching = false;
        })},
    selectors:{
        selectEncode: (state)=>state.encode,
        selectDecode: (state)=>state.decode,
        selectItemsFetch: (state)=>state.itemsFetching,
    }
})

export const cipherReducer = cipherSlice.reducer;

export const {
    selectEncode,
    selectDecode,
    selectItemsFetch,
} = cipherSlice.selectors;