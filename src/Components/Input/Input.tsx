import { Fragment, useState } from "react";

interface InputRec {
    name: string;
    Type?: string;
    namUser ?: boolean;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const InputComp =({ name, namUser, placeholder, onChange, value, Type }: InputRec)=> {
    if(namUser === true ) return null;

    return(
        <div>
            <label>{name}</label>
            <input
            placeholder={placeholder}
            type={Type}
            name={name}
            value={value}
            onChange={onChange}
            />
        </div>
    )
}

export default InputComp;