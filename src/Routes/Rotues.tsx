import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "../Pages/Auth/Login/Login";
import MovieElements from "../Pages/Dat_movies/Dat_movies";
import PrivateRoute from "./PrivateRoutes";

const RutasC = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Login/>}/>

                <Route element = {<PrivateRoute/>}>
                <Route path="/movies/page/:page/list/:ubiq" element = {<MovieElements/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

RutasC.displayName = 'RutasComp';

export default RutasC;