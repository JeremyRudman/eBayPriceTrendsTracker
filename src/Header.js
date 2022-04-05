import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className='header_body'>
                <span className='header_text'>eBay Item Price Tracker</span>
            </div>
        )
    }
}

export default Header;