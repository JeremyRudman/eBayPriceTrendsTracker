import React from 'react';
import './App.css';
import SearchPage from './SearchPage';
import ProductInfo from './ProductInfo';
import Header from './Header';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
            <div>
                <div className='header_content'>
                    <Header />
                </div>
                <div className='main_content'>
                    <Routes>
                        <Route path="/" exact element={<SearchPage/>} />
                        <Route path="/product/:name" element={<ProductInfo/>} />
                    </Routes>
                </div>
            </div>
            </Router>
        )
    }
}

export default App;
