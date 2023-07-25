import { useEffect, useState } from "react";
import { ButtonI } from '../Types/FormsTypes';

const Button = ({ disable, label = " ", onClick }: ButtonI) =>{
    return (
        <button disabled={disable} onClick={onClick}>
        {label}
    </button>
    )
};

Button.displayName = 'Button';
export default Button;