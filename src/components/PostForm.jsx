import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePostThunk } from '../redux/PostSlice';
import { useParams, useNavigate } from 'react-router-dom';

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    createdAt: ''
  });

  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const fetchEditData = posts.find((data) => data.id === id);

  useEffect(() => {
    if (fetchEditData) {
      setFormData({
        title: fetchEditData.title,
        content: fetchEditData.content,
        image: fetchEditData.image,
        category: fetchEditData.category,
        createdAt: fetchEditData.createdAt
      });
    }
  }, [fetchEditData]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === 'image' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Ensure token is checked
    if (!token) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    try {
      if (id) {
        // Update existing post
        await dispatch(updatePostThunk({ id, updateData: formData })).unwrap();
        alert('Post updated successfully!');
      } else {
        // Create a new post
        const newPost = {
          ...formData,
          createdAt: new Date().toISOString(),
          id: Date.now().toString(), // Temporary ID for new post
        };
        await dispatch(createPost(newPost)).unwrap();
        alert('Post created successfully!');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('Failed to save the post');
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      image: '',
      category: '',
      createdAt: '',
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-">
          <div className="card bg-dark text-light" style={{ width: '500px' }}>
            <div className="card-header bg-dark border-secondary">
              <h4 className="mb-0">{id ? 'Edit Blog Post' : 'Create New Blog Post'}</h4>
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
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                  </select>
                </div>
                <button type="submit" className="btn w-100 btn-primary">
                  {id ? 'Edit' : 'Publish'} Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
