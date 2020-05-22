import React, { useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
// from apollo boost
// import ApolloClient, { InMemoryCache, HttpLink } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// gql
import { gql } from 'apollo-boost';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
// import components
import Nav from './components/Nav';
import Home from './pages/Home';
import Users from './pages/Users';
import Register from './pages/auth/Register';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Profile from './pages/auth/Profile';
import Login from './pages/auth/Login';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Post from './pages/post/Post';
import PostUpdate from './pages/post/PostUpdate';
import SinglePost from './pages/post/SinglePost';
import SingleUser from './pages/SingleUser';
import SearchResult from './components/SearchResult';

const App = () => {
    const { state } = useContext(AuthContext);
    const { user } = state;

    // 1. create websocket link
    const wsLink = new WebSocketLink({
        uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
        options: {
            reconnect: true
        }
    });

    // 2. create http link
    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
    });

    // 3. setContext for authtoken
    const authLink = setContext(() => {
        return {
            headers: {
                authtoken: user ? user.token : ''
            }
        };
    });

    // 4. concat http and authtoken link
    const httpAuthLink = authLink.concat(httpLink);

    // 5. use split to split http link or websocket link
    const link = split(
        ({ query }) => {
            // split link based on operation type
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpAuthLink
    );

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link
    });

    // const client = new ApolloClient({
    //     uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    //     request: (operation) => {
    //         operation.setContext({
    //             headers: {
    //                 authtoken: user ? user.token : ''
    //             }
    //         });
    //     }
    // });

    return (
        <ApolloProvider client={client}>
            <Nav />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <PublicRoute exact path="/register" component={Register} />
                <PublicRoute exact path="/login" component={Login} />
                <Route exact path="/complete-registration" component={CompleteRegistration} />
                <Route exact path="/password/forgot" component={PasswordForgot} />
                <PrivateRoute exact path="/password/update" component={PasswordUpdate} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/post/create" component={Post} />
                <PrivateRoute exact path="/post/update/:postid" component={PostUpdate} />
                <Route exact path="/user/:username" component={SingleUser} />
                <Route exact path="/post/:postid" component={SinglePost} />
                <Route exact path="/search/:query" component={SearchResult} />
            </Switch>
        </ApolloProvider>
    );
};

export default App;
