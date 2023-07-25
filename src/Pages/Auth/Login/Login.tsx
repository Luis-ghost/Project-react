import React, { useState } from "react";
import InputComp from "../../../Components/Input/Input";
import Button from "../../../Components/BotonComp/BotonComp";

const Login = () =>{
    const [Email, setEmail] = useState("");
    const [ Pass, setPass ] = useState("");

    const handleChangeDat = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    }

    const handleChangeDat2 =(e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
    }

    const checkEmail = () =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(Email);
    }

    return(
        <>
        <InputComp
        name="Email"
        placeholder='Email'
        Type="text"
        onChange={handleChangeDat}
        value={Email}
        />

        <InputComp
        name="Password"
        placeholder="Password"
        Type='password'
        onChange={handleChangeDat2}
        value={Pass}
        />

        <Button 
        label="Iniciar sesion"
        disable ={Pass ===""}/>
        </>
    )
};

Login.displayName = "Login";

export default Login;