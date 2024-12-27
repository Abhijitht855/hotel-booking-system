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
import RoomsList from "./pages/RoomsList";
import RoomDetails from "./pages/RoomDetails";
import RoomBookingForm from "./pages/RoomBookingForm";
import Footer from "./components/Footer";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rooms" element={<RoomsList />} />
          <Route path="/rooms/:id" element={<RoomDetails/>} />
          <Route path="/booking" element={<RoomBookingForm/>} />

        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;

