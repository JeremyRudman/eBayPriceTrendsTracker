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
        header.append('Authorization', 'Bearer v^1.1#i^1#r^0#I^3#f^0#p^1#t^H4sIAAAAAAAAAOVYa2wUVRTudttig4Uf8gqSsAwlRmBm57E7uzt0F7cv20ppYQtpG7Cdx5126OzMOvcO7YZQS4ON+gsIkQSJQX6AAU2IBpGkmtSIBkg0NWjQgEhEw+OPGAMECfHu7FK2lUBL19jEzSaTe+85557z3fO6l+4rKl46UDNwq8Q1LX9/H92X73Ix0+niosJlM9z58wvz6CwC1/6+0r6CfveVMijG9YSwFsCEaUDg6YnrBhScyTBhW4ZgilCDgiHGARSQLMSi9asElqKFhGUiUzZ1wlNbGSY4lQmCgN/HMSwX9IeCeNa4L7PJDBOMHwTUIMMBOoT/agivQ2iDWgMi0UBhgqVZlqR9JM030ZzABQSOp1iWbSU864EFNdPAJBRNRBx1BYfXytL10aqKEAILYSFEpDZaHWuI1lZWrW4q82bJimRwiCER2XD0qMJUgGe9qNvg0dtAh1qI2bIMICS8kfQOo4UK0fvKPIH6DtQ8DQAjBQO86Gd8CsvmBMpq04qL6NF6pGY0hVQdUgEYSEPJxyGK0ZA2ARllRquxiNpKT+qzxhZ1TdWAFSaqyqMt0cZGIlIHLBBPrrXJhKXJAFkiGStvJv2K7GekEFDJkMrxQJJAZqO0tAzMY3aqMA1FS4EGPatNVA6w1mAsNmwWNpiowWiwoipKaZRN57+PIRNsTR1q+hRt1GmkzhXEMRAeZ/j4ExjhRsjSJBuBEQljFxyIwoSYSGgKMXbR8cWM+/TAMNGJUELweru7u6lujjKtDi9L04y3uX5VTO4EcZHAtKlYT9Nrj2cgNccUGWBOqAkomcC69GBfxQoYHUSEC/oCHJvBfbRakbGz/5jIstk7OiJyFSEKLQOfAnysj1N4PkDnIkIiGSf1pvQAkpgk46LVBVBCF2VAytjP7DiwNEXg/CpOgSogFT6kkr6QqpKSX+FJRgUAR64kyaHg/ylQxuvqMSBbAOXE13Pm543BQF1nuRKsDNUZNZxc1QK8XlTvj1drzDK608vXtDTEaTEa6qmE4fFGw0ONr9A1jEwT3j8XAKRiPXcg1JgQAWVS5sVkMwEaTV2Tk1PrgDlLaRQtlCy3k3gcA7qOP5MyNZpI1OYmY+fMyAkmiyezO3eV6j+qUg+1CqYcd2pZleKHWICY0Chch1KxnqRkM+41RdyEpKbbHK09YwgfSuSV7CTVYQOIsCYK7gPHzaThZE7hkqaMnyVdMLER42fBlwzFltETbeRUZgqjqXV0IjihPXsmA4pk612TcjoNXx6mlMthc9N2a0q666cc4ym4WaYsAE3bwhceqiHVBDeZXcDALQWyTF0H1npm0sk0HreRKOlgqmXVHGQXTZxYv1PQ7zr9r9vF8L4Qy/Csn5+UbbLT0bRNtZqQ61o4gbuNd/RLSyTP+TH9rk/pfteJfJeLDtAk7iufL3KvK3A/TUCcTSgoGopk9lCaqFI4kRkisi1AdYFkQtSs/CKX9uNZ+XbWG8/+jfS8kVeeYjczPevJh17wYKWQmTm3hGVpH83THBfg+FZ68YPVAmZOwazTsz+IXQ1MO97hVrqX3P3t8sqvV6ygS0aIXK7CPOyQeYWD23tfbzs7c3HLthszKlp+3nLpz33Xjh06UbH1nbJZAxcGN/RRO9a8+vLFIev6vUVzj39xanDnkra7s0vO7DhQ9V3B4cPDBb3rir9R7i00t1f/fuLUAf6PRe7hqm/rX1y+95cDpfrOLz/ZebOO3P3WUKNU21ladmloXfPRk3O6D709b96ej27c/kzdtXHTwcsHl235aaB31sl3j70//FR79zXy/IIzg181A+R57cqSX5dC2H5PeunNO+cPf3i9/dzW3mfu7PJcLjz+edO2I6X7lvdcrL71wisfl1VJc/fsvrry+sK9/r/eY4b3HZ3vGTr5nER9b5hvhNTS1g3Mttn9yXObn/0herXuws0FqP3mkf70Mf4N2AYvrn0TAAA=');
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