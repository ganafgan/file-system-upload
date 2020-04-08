import React from 'react';
import PostProduct from './pages/PostProduct'
import { Route } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';

class App extends React.Component{
	render(){
		return(
			<div>
				<Route exact path='/'>
					<PostProduct/>
				</Route>

				<Route path='/product-detail'>
					<ProductDetail/>
				</Route>

				<Route path='/product-list'>
					<ProductList/>
				</Route>
			</div>
		)
	}
}
export default App;
