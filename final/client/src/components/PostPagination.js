import React from 'react';

const PostPagination = ({ page, setPage, postCount }) => {
    let totalPages;
    const pagination = () => {
        totalPages = Math.ceil(postCount && postCount.totalPosts / 3);
        if (totalPages > 10) totalPages = 10;
        // console.log(totalPages);
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li>
                    <a className={`page-link ${page === i && 'activePagination'}`} onClick={() => setPage(i)}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li>
                    <a className={`page-link ${page === 1 && 'disabled'}`} onClick={() => setPage(1)}>
                        Previous
                    </a>
                </li>
                {pagination()}
                <li>
                    <a className={`page-link ${page === totalPages && 'disabled'}`} onClick={() => setPage(totalPages)}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default PostPagination;
