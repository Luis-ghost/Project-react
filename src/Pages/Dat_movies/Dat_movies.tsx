import React, { memo, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import StyleMovie from "./Dat_movies.module.css";
import Button from "../../Components/BotonComp/BotonComp";

const DatMovie = memo(() => {

    const [Caratula, setCaratula] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    console.log('location', location);

    const param = useParams();
    console.log('params', param);

    const AXIOS_SERVICE = axios.create({
        baseURL: 'https://api.themoviedb.org/3/movie/upcoming?page=1'
    })


    const getMovies = async () => {
        setLoading(true); 
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular?page=1',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTYwNWUxMTNkMjk4Yjk1YjAzNzQwNWJkOWFmNzRkMCIsInN1YiI6IjY0YWNhZThmNmEzNDQ4MDE0ZDMzNTRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3E7oR9ZKTCfjRvcvaCBDD984SkeK_E-2NPFXM1QnmmU'
            }
        };

        try {

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);

                const movies = response.data.results.map((MOVIES: any) => {
                    return {
                        ...MOVIES,
                        image: `https://image.tmdb.org/t/p/original${MOVIES.poster_path
                    }`,
                    };
                });
                setCaratula(movies);
            })
        } catch(error) {
                console.error(error);
            } finally{
                setLoading(false)
            }
           
    };

    useEffect(() =>{
        getMovies();
    }, []);


    return (
        <>
            <div>Dashboard</div>
            <img src="../../Assets/Icon_option_background.png" />
            <Button
                onClick={getMovies}
                label="Popular"
            />
            
            <div style={{display: "flex", flexWrap: "wrap", gap: "16px", marginLeft: "15px" }}>
                {loading ? "Loading..." : Caratula.map((MOVIES:any) =>{
                    return(
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
        </>
    )
});

export default DatMovie;