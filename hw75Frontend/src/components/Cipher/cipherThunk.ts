import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const encode = createAsyncThunk<string>(
    'encode/fetchAll',
    async (phrase:string, key:string) =>{
        const {data: encode} = await axiosApi.get<string>(`/encode/${phrase}/${key}`);
        return encode;
    }
)

export const decode = createAsyncThunk<string>(
    'encode/fetchAll',
    async (phrase:string, key:string) =>{
        const {data: decose} = await axiosApi.get<string>(`/decode/${phrase}/${key}`);
        return decose;
    }
)