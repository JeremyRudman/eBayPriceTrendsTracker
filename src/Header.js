import React from 'react';
import {Link} from "react-router-dom";
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className='header_body'>
                <div></div>
                <Link className='header_text' to="/">eBay Item Price Tracker</Link>
            </div>
        )
    }
}

export default Header;