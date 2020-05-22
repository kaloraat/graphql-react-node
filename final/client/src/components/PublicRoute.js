import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PublicRoute = ({ ...rest }) => {
    const { state } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (state.user) {
            history.push('profile');
        }
    }, [state.user]);

    return (
        <div className="container-fluid p-5">
            <Route {...rest} />
        </div>
    );
};

export default PublicRoute;
