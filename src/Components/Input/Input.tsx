import { Fragment, useState } from "react";
import Style_inp from "./Input.module.css";

interface InputRec {
    Style?: any;
    name: string;
    Type?: string;
    namUser?: boolean;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const InputComp = ({ name, namUser, placeholder, onChange, value, Type, Style }: InputRec) => {
    if (namUser === true) return null;

        return (
            <>
                <div>
                    <div className={Style_inp.Text_label}>{name}</div>
                    <input
                        className={Style_inp.Input_movies}
                        placeholder={placeholder}
                        type={Type}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </>
        )
}

export default InputComp;