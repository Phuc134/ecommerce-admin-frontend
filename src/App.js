import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Fail from "./pages/Fail";
import {PrivateRoutes} from "./routing/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
            <Route path='store' element={<OurStore/>}/>
          <Route path='product/:id' element={<SingleProduct/>}/>
          <Route path='blogs' element={<Blog/>}/>
          <Route path='blog/:id' element={<SingleBlog/>}/>
          <Route path='cart' element={<PrivateRoutes><Cart/></PrivateRoutes> }/>
          <Route path='checkout' element={ <PrivateRoutes><Checkout/></PrivateRoutes>}/>
          <Route path='wishlist' element={<PrivateRoutes><Wishlist/></PrivateRoutes>}/>
          <Route path='compare-product' element={<CompareProduct/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='forgot-password' element={<Forgotpassword/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='reset-password' element={<Resetpassword/>}/>
        </Route>
        <Route>
          <Route path="/success" element={<Success/>} />
          <Route path="/fail" element={<Fail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
