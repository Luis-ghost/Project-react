import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "../Pages/Auth/Login/Login";

const RutasC = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

RutasC.displayName = 'RutasComp';

export default RutasC;