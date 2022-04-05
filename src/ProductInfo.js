import React from 'react';
import './ProductInfo.css';
import { withParams } from './withParams'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



class ProductInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pricingData: []
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
        }
        console.log(data)
        const filteredList = this.getProductPriceAndDate(data.itemSummaries);
        console.log(filteredList);
        this.setState({pricingData: filteredList})
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

        lastDate = productList[0]?.itemCreationDate;
        for (let index = 0; index < productList.length; index++) {
            let product = productList[index];
             // currency conversion to be done in later version
             if(product.price.currency === "USD"){
                
                if(lastDate !== product.itemCreationDate || index === (productList.length - 1)){
                    if(index === (productList.length - 1)) {
                        lastDate = product.itemCreationDate;
                        let tempPrice = parseFloat(product.price.value)
                        daysPrices.push(tempPrice)
                        if(tempPrice > maxPrice || maxPrice === -1){
                            maxPrice = tempPrice;
                        }
                        if(tempPrice < minPrice || minPrice === -1){
                            minPrice = tempPrice;
                        }
                    }
                    let tempSum = 0;
                    daysPrices.forEach(price => {
                        tempSum += price;
                    });
                    let averagePrice = tempSum / daysPrices.length;
                    let date = new Date(lastDate);
                    let month = date.getMonth() + 1; // month is indexed on zero indexed
                    let day = date.getDate(); // day is indexed on one indexed
                    let year = date.getFullYear();
                    let dateString = `${year}/${month}/${day}`;
                    graphData.push({price: averagePrice, posted_date: dateString, maxPrice: maxPrice, minPrice: minPrice});
                    maxPrice = -1;
                    minPrice = -1;
                    daysPrices = []
                } 
                lastDate = product.itemCreationDate;
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
        if(this.state.pricingData.length === 0){
            return(
                <div>Loading</div>
            )
        } else {
            return (
                <div className='product_body'>
                    <LineChart width={800} height={800} data={this.state.pricingData}>
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="posted_date" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            )
        }
    }
}


export default withParams(ProductInfo);