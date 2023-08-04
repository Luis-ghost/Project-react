import React, { useState } from "react";
import InputComp from "../../../Components/Input/Input";
import Button from "../../../Components/BotonComp/BotonComp";

import Style_Login from "./Login.module.css";
import MainTemplates from "../../Templates/MainTemplates/MainTemplates";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [Check, setCheck] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    console.log('location', location);

    const handleChangeDat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleChangeDat2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
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
                console.log(response.data);
                const Token = response.data.guest_session_id;
                sessionStorage.setItem('token', response.data.guest_session_id);
                setTimeout(() => {
                    navigate("/movies/" + Token +"/page/1", {
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
                        value={Email}
                    />
                </div>

                <div className={Style_Login.Text_body}>
                    <InputComp
                        Style="Input_movies"
                        name="Contraseña"
                        Type='password'
                        onChange={handleChangeDat2}
                        value={Pass}
                    />
                </div>

                <div className={Style_Login.Text_body}>
                    <input
                        type="checkbox"
                        checked={Check}
                        onChange={() => handleChangeCheck()} />
                    He leido y acepto los terminos y condiciones
                </div>

                <div className={Style_Login.Botton_Styled}>
                    <Button
                        onClick={handleToken}
                        label="Crear cuenta"
                        disable={Check === !true || Pass === "" || Email === ""}
                    />
                </div>
            </div>

        </MainTemplates>
    )
};

export default Login;