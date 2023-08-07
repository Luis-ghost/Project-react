import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(): JSX.Element {

    const getToken = () =>{
        return sessionStorage.getItem('Token');
    }
    const token = getToken();

    if(token) return <Outlet />
    return <Navigate to={"/"}/>
}

PrivateRoute.displayName = "RoutePrivate";
export default PrivateRoute;