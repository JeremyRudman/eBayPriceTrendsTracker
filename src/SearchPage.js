import React from 'react';
import { withRouter } from './withRouter'
import './SearchPage.css';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchEntry: "",
        };

        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
    }

    handleSearchBarChange(event) {
        this.setState({searchEntry: event.target.value});
    }

    handleSearchBarSubmit(event) {
        event.preventDefault();
        console.log(this.state.searchEntry);
        console.log(this.props.navigate);
        this.props.navigate(`/product/${this.state.searchEntry}`)
    }

    render() {
        return (
            <div className='main_body'>
                <div className='title_wrapper'>
                    <span className='title_text'>eBay Item Price Tracker</span>
                </div>
                <div className="search_bar_wrapper">
                    <form onSubmit={this.handleSearchBarSubmit}>
                            <input type="text" className='search_bar' 
                            onChange={this.handleSearchBarChange}
                            placeholder="Enter product name here"/>
                    </form>  
                </div>
            </div>
        )
    }
}

export default withRouter(SearchPage);