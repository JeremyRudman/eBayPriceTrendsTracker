import React from 'react';
import './App.css';
import SearchBar from './SearchBar';
import ProductInfo from './ProductInfo';
import Header from './Header';
import { Routes, Route} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div>
                <div className='header_content'>
                    <Header />
                </div>
                <div className='main_content'>
                
                    <Routes>
                        <Route path="/" element={<SearchBar/>} />
                        <Route path="/product" element={<ProductInfo/>} >
                            <Route path=":product_name" element={<ProductInfo />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        )
    }
}

export default App;
