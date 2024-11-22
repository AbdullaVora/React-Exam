import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch login action
        dispatch(loginUser({ email: formData.email, password: formData.password, navigate }))
            .unwrap()
            .then(() => {
                alert('Login successful!');
                setFormData({
                    email: '',
                    password: '',
                });
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Login failed: ' + (error.message || 'Unknown error'));
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-">
                    <div className="card bg-dark text-light" style={{ width: '400px' }}>
                        <div className="card-header bg-dark border-secondary text-center">
                            <h4 className="mb-0">Login</h4>
                        </div>
                        <div className="card-body bg-dark">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-light border-secondary"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-light border-secondary"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}

                                    />
                                </div>
                                <button type="submit" className="btn mb-3 btn-primary w-100">
                                    Login
                                </button>
                                <Link to='/register'><button type="button" className="btn btn-primary w-100">
                                    Register
                                </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
