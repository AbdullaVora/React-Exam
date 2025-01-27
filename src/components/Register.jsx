import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/UserSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        console.log('Form data:', formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Dispatch registration action
        dispatch(createUser({ email: formData.email, password: formData.password }))
            .unwrap()
            .then(() => {
                alert('Registration successful!');
                
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                navigate("/")
            })
            .catch((error) => {
                console.error('Registration error:', error);
                alert('Registration failed: ' + (error.message || 'Unknown error'));
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-">
                    <div className="card bg-dark text-light" style={{ width: '400px' }}>
                        <div className="card-header bg-dark border-secondary text-center">
                            <h4 className="mb-0">Register</h4>
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
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-light border-secondary"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
