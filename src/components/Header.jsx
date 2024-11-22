import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate('/login');
  };

  return (
    <header className="bg-dark shadow w-100 position-fixed start-0 top-0">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-2">
          {/* Logo/Brand */}
          <Link to="/" className="h4 text-dark text-decoration-none fw-bold">
            <img src={logo} alt="logo" width={150} />
          </Link>

          {/* Navigation Buttons */}
          <div className="d-flex gap-3">
            <Link
              to="/addpost"
              className="btn btn-primary"
            >
              Add Post
            </Link>
            <Link
              to="/showpost"
              className="btn btn-success"
            >
              Show Posts
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
