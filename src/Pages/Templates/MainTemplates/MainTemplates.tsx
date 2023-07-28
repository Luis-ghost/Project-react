import React from "react";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";

import Style_MainT from "./MainTemplates.module.css";

const MainTemplates = ({ children }: any) => {
    return (
        <>
            <Header />
            <div className={Style_MainT.Contorno}>
                {children}
            </div>
            <div className={Style_MainT.Footer}>
            <Footer/>
            </div>
        </>
    )
}

export default MainTemplates;