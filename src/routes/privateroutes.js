import React, { useContext } from 'react';

// Package Imports
import { Route, Redirect } from 'react-router-dom';

// Local Imports
import { AuthContext } from '../auth/AuthContext'

// PrivateRoute Component
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const admin = useContext(AuthContext);
    console.log(admin.admin)
    return (
        <Route {...rest} render={props =>
            !!admin.admin ?
                <RouteComponent {...props} />
                : <Redirect to="/" />
        } />
    )
};

export default PrivateRoute;