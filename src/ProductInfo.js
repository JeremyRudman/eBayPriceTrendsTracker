import React from 'react';
import './ProductInfo.css';
import { withParams } from './withParams'


class ProductInfo extends React.Component {


    componentDidMount() {
        const {name} = this.props.params
        console.log(this.props.params)
        console.log(name)
        // fetch(`https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${this.props.match.params.name}&limit=100`).then(response => response.json())
        // .then(data => {}).catch(err => console.log(err));
    }

    render() {
        return (
            <div className='product_body'>
                test
            </div>
        )
    }
}


export default withParams(ProductInfo);