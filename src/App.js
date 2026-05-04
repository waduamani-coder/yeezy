import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Footer from './components/Footer';
import Cart from './components/Cart'; 
import { CartProvider } from './context/CartContext'; 

function App() {
  return (
    <CartProvider> 
      <Router>
        <div className="App">

          
         

          <header className="App-header">
            <h2
              className="text-dark"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "600",
                letterSpacing: "3px",
                textTransform: "uppercase",
                textAlign: "center",
                marginTop: "20px"
              }}
            >
              Welcome to yeezy clothing
            </h2>
          </header>

          <Routes>
            <Route path="/" element={<Getproducts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addproducts" element={<Addproducts />} />
            <Route path="/makepayment" element={<Makepayment />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Notfound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;