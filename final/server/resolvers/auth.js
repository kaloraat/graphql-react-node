const { gql } = require('apollo-server-express');
const shortid = require('shortid');
const { authCheck } = require('../helpers/auth');
const User = require('../models/user');
const { DateTimeResolver } = require('graphql-scalars');

const profile = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    return await User.findOne({ email: currentUser.email }).exec();
};

const publicProfile = async (parent, args, { req }) => {
    return await User.findOne({ username: args.username }).exec();
};

const allUsers = async (parent, args) => await User.find({}).exec();

const userCreate = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    const user = await User.findOne({ email: currentUser.email });
    return user
        ? user
        : new User({
              email: currentUser.email,
              username: shortid.generate()
          }).save();
};

const userUpdate = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    console.log(args);
    const updatedUser = await User.findOneAndUpdate(
        { email: currentUser.email },
        { ...args.input },
        { new: true }
    ).exec();
    return updatedUser;
};

module.exports = {
    Query: {
        profile,
        publicProfile,
        allUsers
    },
    Mutation: {
        userCreate,
        userUpdate
    }
};
