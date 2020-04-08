import React from 'react'
import Axios from 'axios'

class PostProduct extends React.Component{
	onBtnAdd = () => {
		let name = this.refs.name.value
		let price = Number(this.refs.price.value)
		let images = this.refs.images.files

		let data = {
			name : name,
			price : price
		}
		console.log(images)

		data = JSON.stringify(data)
		if(name && price && images){
			let fd = new FormData()
			for (let i = 0 ; i < images.length ; i++){
				fd.append('product-image',images[i])
			}
			fd.append('data', data)
			console.log(fd)

			Axios.post('http://localhost:4000/product', fd)
			.then((res)=>{
				console.log(res.data)
				alert(`Added success`)
				this.refs.name.value=''
				this.refs.price.value=''
			})
			.catch((err)=>{
				console.log(err)
			})
		}else{
			alert('error')
		}
	}
	render(){
    	return(
      	<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-md-4 card mt-5'>
				<h3 className='mx-auto mt-3'>Post Product</h3>
					<div className='card-body p-3'>
						<input className='form-control' type='text' ref='name' placeholder='product name'/>
						<input className='form-control mt-3' type='number' ref='price' placeholder='product price'/>
						<input className='form-control mt-3' type='file' ref='images' accept='image/*' multiple='multiple'/>
						<input onClick={this.onBtnAdd} className='btn btn-success mt-3' type='button' value='ADD'/>
					</div>
				</div>
			</div>
      	</div>
    	)
 	 }
}

export default PostProduct
