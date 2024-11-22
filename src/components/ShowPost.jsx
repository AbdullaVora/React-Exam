import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/PostSlice';

function ShowPost() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);
    console.log(posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div className="container py-4 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="container py-4 text-center text-danger">
                <h4>Error: {error}</h4>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="row">
                {posts.map((post) => (
                    <div className="col-md-4 mb-4" key={post.id}>
                        <div className="card h-100 bg-dark text-white">
                            <img
                                src={post.image || "https://placeholder.com/800x400"}
                                className="card-img-top"
                                alt="Post thumbnail"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <span className="badge bg-primary mb-2">{post.category}</span>
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.description}</p>
                                <div className="d-flex justify-content-between mt-3">
                                    <button className="btn btn-primary btn-sm">
                                        <i className="fas fa-edit me-1"></i>Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        <i className="fas fa-trash-alt me-1"></i>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowPost;