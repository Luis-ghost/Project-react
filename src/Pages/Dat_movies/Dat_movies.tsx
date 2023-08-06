import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StyleMovie from "./Dat_movies.module.css";
import Button from "../../Components/BotonComp/BotonComp";

import MainTemplates from "../Templates/MainTemplates/MainTemplates";
import not_abilite from "../../Assets/No_avalible.jpg";

import StarRating from "../../Components/Star_rating/Start_rating";
const DatMovie = memo(() => {

    const param = useParams();
    const navigate = useNavigate();
    const [Caratula, setCaratula] = useState([]);
    const [loading, setLoading] = useState(true);
    const [UbiqLink, setUbiqLink] = useState(param.ubiq);
    const [maxPage, setMaxPage] = useState(1);
    const [pageAct, setPageAct] = useState(Number(param.page));


    const [activo, setActivo] = useState<number | null>(1);


    sessionStorage.setItem('token', `${param.token}`);

    const genres = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]




    //const location = useLocation();
    //console.log('location', param); //*Permite conocer donde se encuentra ubicado y que informacion recibe de su pagina anterior
    //*console.log('Ubicacion', UbiqLink); //* Solo sirve paa conocer que boton se esta usando
    //*console.log('paginas maximas'); //Para los parametros de la pagina


    const handleCLink = (type: string, Val: number) => {
        setUbiqLink(type);
        setPageAct(1);
        setActivo(Val);

        navigate(`/movies/` + param.token + `/page/1/list/${type}`);
    }

    const revBotonAct = () => {
        if (UbiqLink === 'now_playing') {
            setActivo(1);
        }
        if (UbiqLink === 'upcoming') {
            setActivo(2);
        }
        if (UbiqLink === 'popular') {
            setActivo(3);
        }
        if (UbiqLink === 'top_rated') {
            setActivo(4);
        }

    }

    const maxPageAvaluable = (type: string) => {
        if (UbiqLink === 'now_playing') {
            if (parseInt(type) <= 500 && parseInt(type) > 0) setMaxPage(parseInt(type));
        }
        if (UbiqLink === 'upcoming') {
            if (parseInt(type) <= 500 && parseInt(type) > 0) setMaxPage(parseInt(type));
        }
        if (UbiqLink === 'popular') {
            if (parseInt(type) >= 500 && parseInt(type) > 0) setMaxPage(500);

        }
        if (UbiqLink === 'top_rated') {
            if (parseInt(type) >= 500 && parseInt(type) > 0) setMaxPage(500);
        }
    }

    if (UbiqLink === 'popular' || UbiqLink === 'top_rated') {
        if (pageAct > 500) setPageAct(500);
        if (pageAct <= 0) setPageAct(1);
    }
    if (UbiqLink === 'now_playing' || UbiqLink === 'upcoming') {
        if (UbiqLink === 'now_playing') {
            if (pageAct > 74) setPageAct(74);
            if (pageAct <= 0) setPageAct(1);

        }
        if (UbiqLink === 'upcoming') {
            if (pageAct > 19) setPageAct(19);
            if (pageAct <= 0) setPageAct(1);
        }
    }


    const getMovies = async () => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${UbiqLink}?language=es-MX&page=${pageAct}`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTYwNWUxMTNkMjk4Yjk1YjAzNzQwNWJkOWFmNzRkMCIsInN1YiI6IjY0YWNhZThmNmEzNDQ4MDE0ZDMzNTRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3E7oR9ZKTCfjRvcvaCBDD984SkeK_E-2NPFXM1QnmmU'
            }
        };



        revBotonAct();
        try {

            await axios
                .request(options)
                .then(function (response) {
                    console.log('info obtenida como respuesta', response.data);
                    maxPageAvaluable(response.data.total_pages);


                    const movies = (response.data.results.map((MOVIES: any) => {
                        const idmovies = MOVIES.id;
                        const genre1 = genres.find((genre) => genre.id === MOVIES.genre_ids[0]);
                        const genre2 = genres.find((genre) => genre.id === MOVIES.genre_ids[2]);

                        const options2 = {
                            method: 'GET',
                            url: `https://api.themoviedb.org/3/movie/${idmovies}?language=es-MX`,
                            headers: {
                                accept: 'application/json',
                                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTYwNWUxMTNkMjk4Yjk1YjAzNzQwNWJkOWFmNzRkMCIsInN1YiI6IjY0YWNhZThmNmEzNDQ4MDE0ZDMzNTRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3E7oR9ZKTCfjRvcvaCBDD984SkeK_E-2NPFXM1QnmmU'
                            }
                        };

                        axios
                            .request(options2)
                            .then(function (response2) {
                                // console.log('response2', response2.data);
                            });

                        return {
                            ...MOVIES,
                            image: `https://image.tmdb.org/t/p/original${MOVIES.poster_path}`,
                            overview: `${MOVIES.overview ? MOVIES.overview : "No disponible"}`,
                            original_title: `${MOVIES.original_title}`,
                            release_date: `${MOVIES.release_date}`,
                            genere1: `${genre1 ? genre1.name : ""}`,
                            genere2: `${genre2 ? genre2.name : ""}`,
                            rating: `${MOVIES.vote_average}`,
                        };


                    }));
                    //console.log('const movies', movies);
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
        navigate(`/movies/` + param.token + `/page/${pageAct - 1}/list/${UbiqLink}`);
    }

    const goToNextpage = () => {
        setPageAct((pageAct) => pageAct + 1);
        navigate(`/movies/` + param.token + `/page/${pageAct + 1}/list/${UbiqLink}`);
    }

    useEffect(() => {
        getMovies();
    }, [UbiqLink, pageAct]);

    return (
        <MainTemplates>
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

            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "16px", marginLeft: "15px" }}>
                {loading ? "Loading..." : Caratula.map((MOVIES: any) => {
                    return (
                        <div style={{ position: "relative" }} key={MOVIES.id}>
                            <img
                                src={MOVIES.image}
                                alt={MOVIES.title}
                                style={{ height: "auto", width: 250, borderRadius: "20px" }}
                            />
                            <div style={{ position: "relative", opacity: 1, width: 200, height: "auto" }}>
                                {MOVIES.original_title}
                            </div>

                            <div style={{ position: "relative", opacity: 1, width: 200, height: "auto" }}>
                                {new Date(MOVIES.release_date).getFullYear()} . {MOVIES.genere1} / {MOVIES.genere2}
                            </div>

                            <div style={{ position: "relative", opacity: 1, width: 200, height: "auto" }}>
                                {MOVIES.overview}
                            </div>

                            <div style={{ position: "relative", opacity: 1, width: 200, height: "auto" }}>
                                <StarRating Star= {MOVIES.rating} />
                            </div>

                        </div>
                    )
                })
                }
            </div>
            <div>
                <button onClick={goToPrevpage} disabled={pageAct === 1}>prev</button>
                <div>{pageAct} / {maxPage}</div>
                <button onClick={goToNextpage} disabled={pageAct === maxPage}>next</button>
            </div>

        </MainTemplates>
    )
});

export default DatMovie;