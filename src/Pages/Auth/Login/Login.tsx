import React, { useState } from "react";
import InputComp from "../../../Components/Input/Input";
import Button from "../../../Components/BotonComp/BotonComp";

import Style_Login from "./Login.module.css";
import MainTemplates from "../../Templates/MainTemplates/MainTemplates";


const Login = () => {
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [Check, setCheck] = useState(false);

    const handleChangeDat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleChangeDat2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
    }

    const handleChangeCheck = () => {
        setCheck(!Check);

    }

    console.log(Check);
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
                        label="Crear cuenta"
                        disable={Check === !true || Pass === "" || Email ===""}
                    />
                </div>
            </div>

        </MainTemplates>
    )
};

export default Login;