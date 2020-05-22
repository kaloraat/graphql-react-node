import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { SINGLE_POST } from '../../graphql/queries';
import { useParams } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';
import PostCard from '../../components/PostCard';

const SinglePost = () => {
    const [values, setValues] = useState({
        content: '',
        image: {
            url: '',
            public_id: ''
        },
        postedBy: {}
    });
    const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);
    // router
    const { postid } = useParams();
    // destructure
    const { content, image } = values;

    useMemo(() => {
        if (singlePost) {
            setValues({
                ...values,
                _id: singlePost.singlePost._id,
                content: singlePost.singlePost.content,
                image: singlePost.singlePost.image,
                postedBy: singlePost.singlePost.postedBy
            });
        }
    }, [singlePost]);

    useEffect(() => {
        console.log(postid);
        getSinglePost({ variables: { postId: postid } });
    }, []);

    return (
        <div className="container p-5">
            <PostCard post={values} />
        </div>
    );
};

export default SinglePost;
