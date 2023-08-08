import React, { useState } from "react";
import InputComp from "../../../Components/Input/Input";
import Button from "../../../Components/BotonComp/BotonComp";

import Style_Login from "./Login.module.css";
import MainTemplates from "../../Templates/MainTemplates/MainTemplates";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [Email, setEmail] = useState("");
    const [Correo, setCorreo] = useState("");
    const [Password, setPassword] = useState("");
    const [Pass, setPass] = useState("");
    const [Check, setCheck] = useState(false);
    const navigate = useNavigate();

    const handleChangeDat = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setCorreo(e.target.value);
        if(emailRegex.test(Correo)) {setEmail(Correo)}
        else {
            console.log("correo no valido");
        }
    }

    const handleChangeDat2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^\S*$/;
        setPassword(e.target.value);
        if(passwordRegex.test(Password)) {setPass(Password)}
        else{
            console.log('No valido');
        }
    }

    const handleChangeCheck = () => {
        setCheck(!Check);
    }

    const handleToken = async () => {

        const options = {
            method: "GET",
            url: "https://api.themoviedb.org/3/authentication/guest_session/new",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTExY2U2ZTBjNGUxZjQ4M2E3NDIxMDNjMDJmYjZmOSIsInN1YiI6IjY0MTM3ZDEyYTZjMTA0MDA3OTA3MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IhXW1F90EvMAP_AMkFrEfMJdyuswuVnBY6_KlyVMkO0",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                const Token = response.data.guest_session_id;
                sessionStorage.setItem('Token', response.data.guest_session_id);
                setTimeout(() => {
                    navigate("/movies/page/1/list/now_playing", {
                        state: {
                            Token,
                            expires_at: response.data.expires_at,
                            username: Email
                        }
                    })
                },)
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return (
        <MainTemplates>

            <div className={Style_Login.Body_format}>
                <div className={Style_Login.Text_prin_body}>
                    <div className={Style_Login.Text_Prin}>Login</div>
                    <div className={Style_Login.Text_body}>¡Bienvenido!</div>
                </div>

                <div className={Style_Login.Text_body}>
                    <InputComp
                        name="Correo electrónico de DaCodes"
                        Type="text"
                        onChange={handleChangeDat}
                        value={Correo}
                    />
                </div>

                <div className={Style_Login.Text_body}>
                    <InputComp
                        Style="Input_movies"
                        name="Contraseña"
                        Type='password'
                        onChange={handleChangeDat2}
                        value={Password}
                    />
                </div>

                <div className={Style_Login.Text_body}>
                    <input
                        type="checkbox"
                        checked={Check}
                        onChange={() => handleChangeCheck()} />
                    He leido y acepto los terminos y condiciones
                </div>

                <div>
                    <Button
                        onClick={handleToken}
                        label="Crear cuenta"
                        disable={Check === !true || Pass === "" || Email === "" || Pass.length < 7}
                    />
                </div>
            </div>

        </MainTemplates>
    )
};

export default Login;