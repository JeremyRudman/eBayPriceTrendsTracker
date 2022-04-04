import React from 'react';
import './App.css';
import SearchBar from './SearchBar';
class App extends React.Component {
    render() {
        return (
            <div className='main_content'>
                <SearchBar />
            </div>
        )
    }
}

export default App;
