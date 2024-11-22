import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/PostSlice';

const PostForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        category: '',
        createdAt: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const newPost = {
                ...formData,
                createdAt: new Date().toISOString(),
                id: Date.now() // temporary ID for demo purposes
            };
            
            dispatch(createPost(newPost));
            
            // Reset form
            setFormData({
                title: '',
                content: '',
                image: '',
                category: '',
                createdAt: ''
            });
            
            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card bg-dark text-light" style={{width: '400px'}}>
                        <div className="card-header bg-dark border-secondary">
                            <h4 className="mb-0">Create New Blog Post</h4>
                        </div>
                        <div className="card-body bg-dark">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-light border-secondary"
                                        id="title"
                                        placeholder="Enter post title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Content</label>
                                    <textarea
                                        className="form-control bg-dark text-light border-secondary"
                                        id="content"
                                        rows="6"
                                        placeholder="Write your blog post content"
                                        value={formData.content}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control bg-dark text-light border-secondary"
                                        id="image"
                                        accept="image/*"
                                        value={formData.image}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className="form-select bg-dark text-light border-secondary" id="category" value={formData.category} onChange={handleChange}>
                                        <option value="">Select a category</option>
                                        <option value="technology">Technology</option>
                                        <option value="lifestyle">Lifestyle</option>
                                        <option value="travel">Travel</option>
                                        <option value="food">Food</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Publish Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostForm;
