import React from 'react';
import { ButtonI } from '../Types/FormsTypes';
import StyleButt from "./BotonComp.module.css";


const Button = ({ disable, label = " ", activo, onClick }: ButtonI) => {

    return (
        <button className={
            `${StyleButt.Botton_Styled} ${activo ? StyleButt.Botton_Styled_active: ''}`
        } 
        disabled={disable} 
        onClick={onClick}>
            {label}
        </button>
    )
};

Button.displayName = 'Button';
export default Button;