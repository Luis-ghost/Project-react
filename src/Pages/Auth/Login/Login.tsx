import React, { useState } from "react";
import InputComp from "../../../Components/Input/Input";
import Button from "../../../Components/BotonComp/BotonComp";

import Style_Login from "./Login.module.css";
import MainTemplates from "../../Templates/MainTemplates/MainTemplates";

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
        <MainTemplates>

        <div className={Style_Login.Contorno}>
        <div>
        <InputComp
        name="Email"
        placeholder='Email'
        Type="text"
        onChange={handleChangeDat}
        value={Email}
        />
        </div>

        <div>
        <InputComp
        name="Password"
        placeholder="Password"
        Type='password'
        onChange={handleChangeDat2}
        value={Pass}
        />
        </div>

        <div>
        <Button 
        label="Iniciar sesion"
        disable ={Pass ===""}/>
        </div>
        </div>
    
        </MainTemplates>
    )
};

Login.displayName = "Login";

export default Login;