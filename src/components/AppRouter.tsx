import React, {FC} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter:FC = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth)

    return (
        isAuth
        ?
        <Routes>
            {privateRoutes.map(route =>
                <Route key={route.path} {...route}/>
            )}
            <Route path="*" element={<Navigate to={RouteNames.CALENDAR}/>}/>
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route =>
                <Route key={route.path} {...route}/>
            )}
            <Route path="*" element={<Navigate to={RouteNames.LOGIN}/>}/>
        </Routes>
    );
};

export default AppRouter;