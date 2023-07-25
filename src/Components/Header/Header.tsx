import React from "react";
import Back_head from "./Icon_header/Header_background.png";
import Empr_logo from "./Icon_header/DacodesLogo 1.png";
import Icon_user from "./Icon_header/Icon_user.png";

import Style_header from "./Header.module.css";

const Header = () =>{
    return(
        <div className={Style_header.Background}>

            <div className={Style_header.Icons_header}>

                <div>
                    <img 
                    className={Style_header.Icon_emprStyle}
                    src={Empr_logo}/>
                </div>
                
                <div>
                    <img 
                    className={Style_header.Icon_userStyle}
                    src={Icon_user}/>
                </div>

            </div>

        </div>
    )
}

Header.displayName = "Header";
export default Header;