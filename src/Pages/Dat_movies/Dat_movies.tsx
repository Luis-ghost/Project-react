import React, { memo, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import StyleMovie from "./Dat_movies.module.css";
import Button from "../../Components/BotonComp/BotonComp";

import MainTemplates from "../Templates/MainTemplates/MainTemplates";

const DatMovie = memo(() => {

    const [Caratula, setCaratula] = useState([]);
    const [loading, setLoading] = useState(false);
    const [UbiqLink, setUbiqLink] = useState("now_playing");
    const [activo, setActivo] = useState<number | null>(1);

    const param = useParams();
    const navigate = useNavigate();
    const [pageAct, setPageAct] = useState(Number(param.page));

    const location = useLocation();
    //console.log('location', location); //*Permite conocer donde se encuentra ubicado y que informacion recibe de su pagina anterior
    //*console.log('Ubicacion', UbiqLink); //* Solo sirve paa conocer que boton se esta usando
    console.log('params', param); //Para los parametros de la pagina


    const handleCLink = (type: string, Val: number) => {
        setUbiqLink(type);
        setPageAct(1);
        setActivo(Val);

        navigate(`/movies/`+param.token+`/page/${pageAct}`)
    }

    const getMovies = async () => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${UbiqLink}?page=${pageAct}`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTYwNWUxMTNkMjk4Yjk1YjAzNzQwNWJkOWFmNzRkMCIsInN1YiI6IjY0YWNhZThmNmEzNDQ4MDE0ZDMzNTRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3E7oR9ZKTCfjRvcvaCBDD984SkeK_E-2NPFXM1QnmmU'
            }
        };

        try {

            axios
                .request(options)
                .then(function (response) {
                    console.log('info obtenida como respuesta', response.data);

                    const movies = response.data.results.map((MOVIES: any) => {
                        return {
                            ...MOVIES,
                            image: `https://image.tmdb.org/t/p/original${MOVIES.poster_path
                                }`,
                        };
                    });
                    console.log('const movies', movies);
                    setCaratula(movies);
                })
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }

    };

    const goToPrevpage = () => {
        setPageAct((pageAct) => pageAct - 1);
        navigate(`/movies/`+param.token+`/page/${pageAct-1}`);
    }

    const goToNextpage = () => {
        setPageAct((pageAct) => pageAct + 1);
        navigate(`/movies/`+param.token+`/page/${pageAct+1}`);
    }

    useEffect(() => {
        getMovies();
    }, [UbiqLink, pageAct]);


    return (
        <>
            <div>
                <Button
                    onClick={() => handleCLink("now_playing", 1)}
                    label="Now playing"
                    activo={activo === 1}
                />

                <Button
                    onClick={() => handleCLink("upcoming", 2)}
                    label="Upcoming"
                    activo={activo === 2}
                />

                <Button
                    onClick={() => handleCLink("popular", 3)}
                    label="Popular"
                    activo={activo === 3}
                />

                <Button
                    onClick={() => handleCLink("top_rated", 4)}
                    label="Top rated"
                    activo={activo === 4}
                />
            </div>

            <div>
                <div>Latest</div>
                <div>Lista de peliculas</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginLeft: "15px" }}>
                {loading ? "Loading..." : Caratula.map((MOVIES: any) => {
                    return (
                        <div key={MOVIES.id}>
                            <img
                                src={MOVIES.image}
                                alt={MOVIES.title}
                                style={{ height: "auto", width: 200, borderRadius: "20px" }}
                            />
                        </div>
                    )
                })
                }
            </div>
            <div>
                <button onClick={goToPrevpage} disabled={pageAct === 1}>prev</button>
                <button onClick={goToNextpage}>next</button>
            </div>

        </>
    )
});

export default DatMovie;