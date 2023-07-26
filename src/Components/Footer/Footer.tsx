import React from "react";
import Logos_comp from "./Footer_icons/Icons_comer.png";

import Style_Footer from "./Footer.module.css";

const Footer_page = () => {
    return(
        <div className={Style_Footer.Backg_page}>
            <div>
                <div>
                    <div>
                        <div>We are coding the world of tomorrow_</div>
                    </div>

                    <div>
                        <div>
                            DaCodes es una de las mejores empresas de desarrollo de software en México y LATAM. Lo que nos separa de los demás es el nivel de involucramiento que tenemos en nuestros proyectos y la pasión que tenemos por desarrollar productos digitales de calidad mundial. Somos un equipo de 220+ dacoders especializados en la planeación, diseño, desarrollo, implementación e innovación continua de productos digitales disruptivos.
                        </div>
                    </div>
                </div>

                <div>
                    <img className={Style_Footer.Logos_partner} src={Logos_comp}/>
                </div>
            </div>
        </div>
    )
}

Footer_page.displayName ="Footer";
export default Footer_page;