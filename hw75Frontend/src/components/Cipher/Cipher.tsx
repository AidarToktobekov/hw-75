import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectEncode, selectDecode} from "./cipherSlice.ts";
import {useEffect, useState} from "react";
import {decode, encode} from "./cipherThunk.ts";
    import {Button, Grid, Input, Typography  } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Cipher = ()=>{

    const dispatch = useAppDispatch();
    const getEncode = useAppSelector(selectEncode);
    const getDecode = useAppSelector(selectDecode);

    const [inputsState, setInputsState] = useState<{encodeText: string, password: string, decodeText: string}>({encodeText: "", password: "", decodeText: ""});

    const onChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setInputsState((prev)=>({
            ...prev,
            [event.target.name]: event.target.value,
    }));
    }
    useEffect(()=>{
        setInputsState((prev)=>({...prev,encodeText: getEncode, decodeText: getDecode}));
    },[getEncode, getDecode]);

    const getCipherEncode = async ()=>{
        try{
            await dispatch(encode({phrase: inputsState.encodeText, key: inputsState.password})).unwrap();
        }catch (e){
            alert('Заполните Encode и Password!');
            console.log(e);
        }
    }
    const getCipherDecode = async ()=>{
        try{
            await dispatch(decode({phrase: inputsState.decodeText, key: inputsState.password})).unwrap();
        }catch (e){
            alert('Заполните Decode и Password!');
            console.log(e);
        }
    }


    return(
        <>
            <Grid container direction="column" spacing={2}>
                <Typography variant={'h1'} fontSize={'30px'} textAlign={'center'} margin={'10px 0'}>Cipher</Typography >
                <Grid item container justifyContent={"center"}>
                    <Input type="text" name='encodeText' placeholder='Encode' onChange={onChange}
                           value={inputsState.encodeText} required/>
                </Grid>
                <Grid item container justifyContent={"center"}>
                    <Button onClick={getCipherEncode}><ArrowDownwardIcon/></Button>
                    <Input name='password' placeholder='Password' onChange={onChange} value={inputsState.password}
                           required/>
                    <Button onClick={getCipherDecode}><ArrowUpwardIcon/></Button>
                </Grid>
                <Grid item container justifyContent={"center"}>
                    <Input type="text" name='decodeText' placeholder='Decode' onChange={onChange}
                           value={inputsState.decodeText} required/>
                </Grid>
            </Grid>
        </>
    )
}

export default Cipher;