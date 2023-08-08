import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/BotonComp/BotonComp";
import axios from "axios";
import StyleMovie from "./Dat_movies.module.css";
import StyleText from "./StyleText.module.css";


import MainTemplates from "../Templates/MainTemplates/MainTemplates";

import StarRating from "../../Components/Star_rating/Start_rating";
const DatMovie = memo(() => {

    const param = useParams();
    const navigate = useNavigate();
    const [Caratula, setCaratula] = useState([]);
    const [loading, setLoading] = useState(true);
    const [UbiqLink, setUbiqLink] = useState(param.ubiq);
    const [maxPage, setMaxPage] = useState(1);
    const [pageAct, setPageAct] = useState(Number(param.page));
    const [TituloP, setTituloP] = useState("");

    const [activo, setActivo] = useState<number | null>(1);

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

    const handleCLink = (type: string, Val: number) => {
        setUbiqLink(type);
        setPageAct(1);
        setActivo(Val);

        navigate(`/movies/page/1/list/${type}`);
    }

    const revBotonAct = () => {
        if (UbiqLink === 'now_playing') {
            setActivo(1);
            setTituloP("Now playing");
        }
        if (UbiqLink === 'upcoming') {
            setActivo(2);
            setTituloP("Upcoming");
        }
        if (UbiqLink === 'popular') {
            setActivo(3);
            setTituloP("Popular");
        }
        if (UbiqLink === 'top_rated') {
            setActivo(4);
            setTituloP("Top rated");
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
                    maxPageAvaluable(response.data.total_pages);

                    const movies = (response.data.results.map((MOVIES: any) => {
                        const idmovies = MOVIES.id;
                        const genre1 = genres.find((genre) => genre.id === MOVIES.genre_ids[0]);
                        const genre2 = genres.find((genre) => genre.id === MOVIES.genre_ids[1]);

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
        navigate(`/movies/page/${pageAct - 1}/list/${UbiqLink}`);
    }

    const goToNextpage = () => {
        setPageAct((pageAct) => pageAct + 1);
        navigate(`/movies/page/${pageAct + 1}/list/${UbiqLink}`);
    };

    const pageMax = maxPage;
    console.log('pagina', pageMax);
    const val=(Number(param.page));
    console.log('pagina ingresada', val);

    const prueba = () =>{
    }

    if (UbiqLink === 'now_playing' || UbiqLink === 'upcoming') {
        if (UbiqLink === 'now_playing') {
            if (pageAct >= 500 ) setPageAct(pageMax);
            if (pageAct <= 0) setPageAct(1);

        }
        if (UbiqLink === 'upcoming') {
            if (pageAct >= 500) setPageAct(pageMax);
            if (pageAct <= 0) setPageAct(1);
        }
    }


    useEffect(() => {
        getMovies();
    }, [UbiqLink, pageAct]);

    return (
        <MainTemplates>
            <div className={StyleMovie.NavBar_Options}>
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

            <div className={StyleText.Body_format}>
                <div className={StyleText.Text_Prin}>{TituloP}</div>
                <div className={StyleText.Text_body}>Lista de peliculas</div>
            </div>

            <div className={StyleMovie.Contain_inf} >

                {loading ? "Loading..." : Caratula.map((MOVIES: any) => {
                    return (
                        <div className={StyleMovie.Movies_Contain} key={MOVIES.id}>
                            <img
                                src={MOVIES.image}
                                alt={MOVIES.title}
                                className={StyleMovie.Image_Contain}
                            />

                            <div className={StyleMovie.Cont_descrip}>

                                <div className={StyleMovie.Inf_Contain}>
                                    <div className={StyleText.Carat_Titulo}>
                                        {MOVIES.original_title}
                                    </div>
                                </div>

                                <div className={StyleMovie.Inf_Contain}>
                                    <div className={StyleText.Carat_infmovie}>
                                        {new Date(MOVIES.release_date).getFullYear()} . {MOVIES.genere1} / {MOVIES.genere2}
                                    </div>
                                </div>

                                <div className={StyleMovie.Inf_Contain}>
                                    <div className={StyleText.Carat_overview}>
                                        {MOVIES.overview}
                                    </div>
                                </div>

                                <div className={StyleMovie.Inf_Contain}>
                                    <div className={StyleText.Carat_Rating}>
                                        <StarRating Star={MOVIES.rating} />
                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                })
                }
            </div>

            <div className={StyleMovie.Navbar_Pag}>
                <div className={StyleMovie.Butt_Cont}>
                    <button className={StyleMovie.Butt_StyledPrev} onClick={goToPrevpage} disabled={pageAct === 1} />
                </div>

                <div>{pageAct} / {maxPage}</div>

                <div className={StyleMovie.Butt_Cont}>
                    <button className={StyleMovie.Butt_StyledNext} onClick={goToNextpage} disabled={pageAct === maxPage} />
                </div>
            </div>

        </MainTemplates>
    )
});

export default DatMovie;