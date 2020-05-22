import { gql } from 'apollo-boost';
import { POST_DATA } from './fragments';

export const POST_ADDED = gql`
    subscription {
        postAdded {
            ...postData
        }
    }
    ${POST_DATA}
`;

export const POST_UPDATED = gql`
    subscription {
        postUpdated {
            ...postData
        }
    }
    ${POST_DATA}
`;

export const POST_DELETED = gql`
    subscription {
        postDeleted {
            ...postData
        }
    }
    ${POST_DATA}
`;
