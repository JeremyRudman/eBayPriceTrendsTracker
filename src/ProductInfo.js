import React from 'react';
import './ProductInfo.css';
import { withParams } from './hooks/withParams'
import { ComposedChart, ResponsiveContainer, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ClipLoader from "react-spinners/ClipLoader";



class ProductInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pricingData: [],
            loading: true,
        }
    }


    async componentDidMount() {
        const {name} = this.props.params
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ');
        const response = await fetch(`https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${name}&filter=buyingOptions:{FIXED_PRICE},conditions:{NEW}&limit=100`,
        {method: 'GET',
        headers: header})
        const data = await response.json();
        if(!response.ok){
            console.log("Error: " + data.errors);
        } else {
            let filteredList = []
            console.log(data)
            if(data.total !== 0){
                filteredList = this.getProductPriceAndDate(data.itemSummaries);
            }
            this.setState({pricingData: filteredList, loading: false})
        }
    }

    convertUTCDateToDateString(dateUTC) {
        let date = new Date(dateUTC);
        let month = date.getMonth() + 1; // month is indexed on zero indexed
        let day = date.getDate(); // day is indexed on one indexed
        let year = date.getFullYear();
        let dateString = `${year}/${month}/${day}`;
        return dateString
    }

    getProductPriceAndDate(productList) {
        var graphData = []
        var daysPrices = []
        var lastDate = -1;
        var minPrice = -1;
        var maxPrice = -1

        productList.sort((a,b) => {
            if(a.itemCreationDate > b.itemCreationDate) {
                return 1
            } else {
                return -1
            }
        })

        lastDate = this.convertUTCDateToDateString(productList[0]?.itemCreationDate);
        for (let index = 0; index < productList.length; index++) {
            let product = productList[index];
             // currency conversion to be done in later version
             if(product.price.currency === "USD"){
                if(lastDate !== this.convertUTCDateToDateString(product.itemCreationDate) || index === (productList.length - 1)){
                    if(index === (productList.length - 1)) {
                        lastDate = this.convertUTCDateToDateString(product.itemCreationDate);
                        let tempPrice = parseFloat(product.price.value)
                        daysPrices.push(tempPrice)
                        if(tempPrice > maxPrice || maxPrice === -1){
                            maxPrice = tempPrice;
                        }
                        if(tempPrice < minPrice || minPrice === -1){
                            minPrice = tempPrice;
                        }
                    }
                    daysPrices.sort((a,b) => {return a - b;});
                    let price;
                    price = daysPrices[Math.floor(daysPrices.length/2)];
                    graphData.push({price: price, posted_date: lastDate, priceRange: [minPrice, maxPrice]});
                    maxPrice = -1;
                    minPrice = -1;
                    daysPrices = [];
                } 
                lastDate = this.convertUTCDateToDateString(product.itemCreationDate)
                let tempPrice = parseFloat(product.price.value)
                daysPrices.push(tempPrice)
                if(tempPrice > maxPrice || maxPrice === -1){
                    maxPrice = tempPrice;
                }
                if(tempPrice < minPrice || minPrice === -1){
                    minPrice = tempPrice;
                }
            }
        }

        return graphData
    }

    render() {
        const {name} = this.props.params
        if(this.state.loading){
            return(
                <div className='product_body'>
                    <span className='product_name'>Product: {name}</span>
                    <div className='product_graph'>
                        <div className='loading_wrapper'>
                            <ClipLoader size={150} color={"#a1a1a1"} loading={this.state.loading}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='product_body'>
                    <span className='product_name'>Product: {name}</span>
                    <div className='product_graph'>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart  className='product_graph' margin={{ top: 10, left: 10, right: 20, bottom: 10 }} data={this.state.pricingData}>
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="posted_date" />
                                <YAxis domain={[0,100]}/>
                                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                <Area type="monotone" dataKey="priceRange" stroke="#8884d8" fill="#b8b4fa" />
                                <Tooltip />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )
        }
    }
}


export default withParams(ProductInfo);