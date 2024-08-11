import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const encode = createAsyncThunk<string, { phrase: string, key: string }>(
    'encode/fetchAll',
    async ({phrase, key}) =>{
        const {data: decode} = await axiosApi.get<string>(`/encode/${phrase}/${key}`);
        return decode;
    }
);

export const decode = createAsyncThunk<string, { phrase: string, key: string }>(
    'decode/fetchAll',
    async ({phrase, key}) =>{
        const {data: encode} = await axiosApi.get<string>(`/decode/${phrase}/${key}`);
        return encode;
    }
);