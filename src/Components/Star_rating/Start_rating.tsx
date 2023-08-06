import React from "react";
import StartStyles from "./Start_rating.module.css";

export default function StarRating({ Star }:any) {
    const maxStars = 10;
    const starPorcentaje = (Star / maxStars) * 100;

    const starPorcentajeRed = Math.round(starPorcentaje);

    const StarSt = () =>{
        return{
            width: starPorcentajeRed + "%",
        };
    };
    return(
        <>
        <div className={StartStyles.stars_gray}>
            <div className={StartStyles.stars_yellow} style={StarSt()}></div>
        </div>
        </>
    )
};