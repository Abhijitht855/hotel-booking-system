import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext.jsx";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="p-5 shadow-2xl">
      <nav className="flex justify-between">
        <Link to="/" className="font-bold">Hotel Booking</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.name}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded text-white">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
