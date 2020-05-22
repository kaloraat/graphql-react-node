import React, { useState, useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router-dom';
import { ALL_USERS } from '../graphql/queries';
import UserCard from '../components/UserCard';

const Users = () => {
  const { data, loading, error } = useQuery(ALL_USERS);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allUsers.map((user) => (
            <div className="col-md-4" key={user._id}>
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
