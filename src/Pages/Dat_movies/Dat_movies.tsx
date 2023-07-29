import React, { memo } from "react";
import { useLocation, useParams } from "react-router-dom";

const DatMovie = memo(() => {

    const location = useLocation();
    console.log('location', location);

    const param = useParams();
    console.log('params', param);
    

    return(
        <>
        <div>Dashboard</div>
        <img src="../../Assets/Icon_option_background.png"/>
        </>
    )
});

export default DatMovie;