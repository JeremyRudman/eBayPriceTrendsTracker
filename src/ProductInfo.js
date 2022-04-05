import React from 'react';
import './ProductInfo.css';
import { withParams } from './withParams'
import * as d3 from "d3";



class ProductInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item_pricing: []
        }
    }


    componentDidMount() {
        const {name} = this.props.params
        console.log(this.props.params)
        console.log(name)
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', '');
        fetch(`https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${name}&limit=100`,
        {method: 'GET',
        headers: header})
        .then(response => response.json())
        .then(data => {console.log(data)}).catch(err => console.log(err));
    }

    render() {
        if(this.state.item_pricing.length === 0){
            return(
                <div>Loading</div>
            )
        } else {
            return (
                <div className='product_body'>
                    
                </div>
            )
        }
    }
}


export default withParams(ProductInfo);