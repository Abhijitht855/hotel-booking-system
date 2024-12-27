import { Link } from "react-router-dom";



const Navbar = () => {


  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between">
        <Link to="/" className="font-bold">Admin Panel</Link>
        <div>
          
          
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
       
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
