import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectEncode, selectDecode} from "./cipherSlice.ts";
import {useEffect, useState} from "react";
import {decode, encode} from "./cipherThunk.ts";

const Cipher = ()=>{

    const dispatch = useAppDispatch();
    const getEncode = useAppSelector(selectEncode);
    const getDecode = useAppSelector(selectDecode);

    const [inputsState, setInputsState] = useState<{encodeText: string, password: string, decodeText: string}>({encodeText: "", password: "", decodeText: ""});

    const onChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setInputsState((prev)=>({
            ...prev,
            [event.target.name]: event.target.value,
    }))
    }
    useEffect(()=>{
        setInputsState((prev)=>({...prev,encodeText: getEncode, decodeText: getDecode}));
    },[getEncode, getDecode])

    const getCipherEncode = async ()=>{
        try{
            await dispatch(encode({phrase: inputsState.encodeText, key: inputsState.password})).unwrap()
        }catch (e){
            console.log(e)
        }
    }
    const getCipherDecode = async ()=>{
        try{
            await dispatch(decode({phrase: inputsState.encodeText, key: inputsState.password})).unwrap();
        }catch (e){
            console.log(e)
        }
    }


    return(
        <>
            <div>
                <div>
                    <input type="text" name='encodeText' placeholder='Encode' onChange={onChange} value={inputsState.encodeText} required/>
                </div>
                <button onClick={getCipherEncode}>Encode</button>
                <div>
                    <input name='password' placeholder='Password' onChange={onChange} value={inputsState.password} required/>
                </div>
                <button onClick={getCipherDecode}>Decode</button>
                <div>
                    <input type="text" name='decodeText' placeholder='Decode' onChange={onChange} value={inputsState.decodeText} required/>
                </div>
            </div>
        </>
    )
}

export default Cipher;