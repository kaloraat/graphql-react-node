const { gql } = require('apollo-server-express');

module.exports = gql`
    # scalar type
    scalar DataTime
    type Query {
        me: String!
    }
    type Image {
        url: String
        public_id: String
    }
    type User {
        _id: ID!
        username: String
        name: String
        email: String
        images: [Image]
        about: String
        createdAt: DataTime
        updatedAt: DataTime
    }
    # custom type
    type UserCreateResponse {
        username: String!
        email: String!
    }
    # input type
    input ImageInput {
        url: String
        public_id: String
    }
    # input type
    input UserUpdateInput {
        username: String
        name: String
        email: String!
        images: [ImageInput]
        about: String
    }
    type Query {
        profile: User!
        publicProfile(username: String!): User!
        allUsers: [User!]
    }
    type Mutation {
        userCreate: UserCreateResponse!
        userUpdate(input: UserUpdateInput): User!
    }
`;
