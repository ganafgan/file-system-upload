import React from 'react';
import PostProduct from './pages/PostProduct'
import { Route } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import EditImage from './pages/EditImage'
import Home from './pages/Home';
import Navbar from './elements/Navbar';

class App extends React.Component{
	render(){
		return(
			<div>
				<Navbar/>
				<div>
					<Route exact path='/'>
						<Home/>
					</Route>

					<Route path='/post-product'>
						<PostProduct/>>
					</Route>

					<Route path='/product-detail'>
						<ProductDetail/>
					</Route>

					<Route path='/product-list'>
						<ProductList/>
					</Route>

					<Route path='/edit'>
						<EditImage/>
					</Route>
				</div>
			</div>
		)
	}
}
export default App;
