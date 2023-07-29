import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Private_Route(): JSX.Element {
    const isAuthentic = true;
    if(isAuthentic) return <Outlet />
    return <Navigate to={"/"}/>
}

Private_Route.displayName = "RoutePrivate";
export default Private_Route;