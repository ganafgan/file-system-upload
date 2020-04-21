import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class EditImage extends React.Component{
    state ={
        dataProduct : null
    }

    componentDidMount(){
        this.getDataProductFromIdImage()
    }

    getDataProductFromIdImage = () =>{
        var id = window.location.pathname.split('/')[2]
        Axios.get('https://upload-system-api.herokuapp.com/product/image/' + id )
        .then((res) => {
            console.log(res.dataProduct.data)    
            this.setState({dataProduct : res.dataProduct.data})
            console.log(this.state.dataProduct)  
            console.log(this.state.dataProduct[0].product_id)             
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    onSubmitClick = () => {
        let images = this.refs.images.files
        console.log(images)
        let fd = new FormData()
        fd.append('product-image' , images[0])
        console.log(fd)
        var id = window.location.pathname.split('/')[2]
        
      Axios.patch('https://upload-system-api.herokuapp.com/product/image/' + id, fd )
      .then((res) => {
        console.log(res.dataProduct)
        alert(res.dataProduct.message)
        this.refs.images.value = null
        
      })
      .catch((err) => {
        console.log(err)
      })
         
    
    }
    
    render(){
        if(this.state.data === null) return <h1>Loading ...</h1>
        return(            
        <div className='container pt-5'>
        <div className='row justify-content-center'> 
          <div className='col-md-4 card'>
            <h5 class="card-title">Edit Image</h5>
            <div className='card-body'>              
              <input ref='images' type='file' className='form-control mt-3' accept='image/*'/>
              <input type='button' className='btn btn-outline-primary mt-3' value='submit' onClick={this.onSubmitClick} />
                {/* <Link to={'/product-detail/' + this.state.dataProduct[0].product_id}>
              <input type='button' className='btn btn-outline-primary mt-3 ml-3' value='Back To Product Detail'  />

              </Link> */}
            </div>
          </div>
        </div>
      </div>
        )
    }
}

export default EditImage;