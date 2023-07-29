import { ButtonI } from '../Types/FormsTypes';
import StyleButt from "./BotonComp.module.css";


const Button = ({ disable, label = " ", onClick }: ButtonI) => {

    return (
        <button className={StyleButt.Botton_Styled} disabled={disable} onClick={onClick}>
            {label}
        </button>
    )
};

Button.displayName = 'Button';
export default Button;