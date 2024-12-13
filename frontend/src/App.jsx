// // import React from 'react'
// // import { Route, Routes } from 'react-router-dom'
// // import Navbar from './components/Navbar'
// // import Home from './pages/Home'
// // import Footer from './components/Footer'
// // import Login from './pages/Login'

// // const App = () => {
// //   return (
// //     <div className=''>
      
// //       <Navbar/>
     
// //       <Routes>
// //         <Route path='/' element={<Home/>}/>
// //         <Route path='/login' element={<Login/>}/>

// //       </Routes>

// //       <Footer/>
      
// //     </div>
// //   )
// // }

// // export default App
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./Context/authContext";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import RoomBooking from "./pages/RoomBooking";
// import NotFound from "./pages/NotFound";
// import PrivateRoute from "./components/privateRoute";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/book-room" element={<PrivateRoute><RoomBooking /></PrivateRoute>} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RoomBooking from "./pages/RoomBooking";

import PrivateRoute from "./components/privateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-room" element={<PrivateRoute><RoomBooking /></PrivateRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

