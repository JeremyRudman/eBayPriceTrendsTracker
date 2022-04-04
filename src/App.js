import React from 'react';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className='main_body'>
                <div className="search_bar_wrapper">
                    <input type="text" name="search_bar" className='search_bar' />
                </div>
            </div>
        )
    }
}

export default App;
