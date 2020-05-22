const { gql } = require('apollo-server-express');

module.exports = gql`
    type Post {
        _id: ID!
        content: String
        image: Image
        postedBy: User
    }
    # input type
    input PostCreateInput {
        content: String!
        image: ImageInput
    }
    # input type
    input PostUpdateInput {
        _id: String!
        content: String!
        image: ImageInput
    }
    # queries
    type Query {
        totalPosts: Int!
        allPosts(page: Int): [Post!]!
        postsByUser: [Post!]!
        singlePost(postId: String!): Post!
        search(query: String): [Post]
    }
    # mutations
    type Mutation {
        postCreate(input: PostCreateInput!): Post!
        postUpdate(input: PostUpdateInput!): Post!
        postDelete(postId: String!): Post!
    }
    # subscriptions
    type Subscription {
        postAdded: Post
        postUpdated: Post
        postDeleted: Post
    }
`;
