import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePostThunk } from '../redux/PostSlice';
import { useNavigate } from 'react-router-dom';

function ShowPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);
    // console.log(posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleNavigate = (id) => {
        navigate(`/addpost/${id}`)
    }

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
        <div className="container py-5 mt-4">
            <div className="row g-4 justify-content-between">
                {posts.map((post) => (
                    <div className="card shadow-lg bg-dark text-white border-0 hover-effect" style={{ width: "380px", margin: '20px 12px' }}>
                        <div className="position-relative">
                            <img
                                src={post.image || "https://placeholder.com/800x400"}
                                className="card-img-top"
                                alt="Post thumbnail"
                                style={{ height: '220px', objectFit: 'cover' }}
                            />
                            <span className="badge bg-primary position-absolute top-0 end-0 m-3">
                                {post.category}
                            </span>
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold mb-3">{post.title}</h5>
                            <p className="card-text flex-grow-1">{post.content}</p>
                            <div className="d-flex justify-content-between flex-column align-items-center">
                                <button className="btn btn-primary d-block w-100 mb-2 px-3" onClick={() => handleNavigate(post.id)}>
                                    <i className="fas fa-edit me-2"></i>Edit
                                </button>
                                <button
                                    className="btn btn-danger px-3 d-block w-100"
                                    onClick={() => dispatch(deletePostThunk(post.id))}
                                >
                                    <i className="fas fa-trash-alt me-2"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowPost;