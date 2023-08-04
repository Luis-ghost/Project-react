import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "../Pages/Auth/Login/Login";
import MovieElements from "../Pages/Dat_movies/Dat_movies";

const RutasC = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Login/>}/>
                <Route path="/movies/:token/page/:page" element = {<MovieElements/>} />
            </Routes>
        </BrowserRouter>
    )
}

RutasC.displayName = 'RutasComp';

export default RutasC;