import React, { Component } from 'react'
import Axios from 'axios'

export default class ProductDetail extends Component {

    state = {
        dataProduct : null,
        selectedProduct : null,
        selectedImage : null
    }

    componentDidMount(){
        this.getDataProduct()
    }

    getDataProduct = () => {
        const id  = window.location.pathname.split('/')[2]
        Axios.get('https://upload-system-api.herokuapp.com/product/' + id)
        .then((res)=>{
            console.log(res.data.data)
            this.setState({dataProduct : res.data.data, selectedProduct : res.data.data[0]})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onSaveBtn = () => {
        console.log(this.state.selectedProduct)
        const image = this.refs.editImage.files[0]
        const id_image = this.state.selectedProduct.image_id
        const path = this.state.selectedProduct.image_url

        const fd = new FormData()
        fd.append(`editImage`, image)
        fd.append(`path`,path)
        Axios.patch(`https://upload-system-api.herokuapp.com/product/image/` + id_image, fd)
        .then((res)=>{
            if(res.dataProduct.error === false){
                alert(res.dataProduct.message)
                this.setState({selectedImage : null})
                this.getDataProduct()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onChangeInputImage = () => { 
        let image = this.refs.editImage.files[0]
        this.setState({selectedImage : image.name})
    }

    renderListImage = () => {
        let listImage = this.state.dataProduct
        listImage = listImage.filter((val)=>{
            return val.image_id !== this.state.selectedProduct.image_id
        })

        return listImage.map((dataProduct)=>{
            return (
                <div className='col-md-3'>
                    <div className='card p-2' style={{maxWidth:'190px'}}>
                        <img src={'https://upload-system-api.herokuapp.com/' + dataProduct.image_url}
                        onClick={()=> this.setState({selectedProduct : dataProduct})}
                        style={{height:'170px', width:'170px'}}
                        />
                    </div>
                </div>
            )
        })
    }

    render() {
        if(this.state.dataProduct === null) return <h1>Loading...</h1>
        if(this.state.dataProduct.length === 0) return <h1>Data Kosong ...</h1>
        return (
            <div className='container'>
                <div className='row'>
                    <h3 className='mx-auto mt-5'>Product Detail</h3>
                </div>
                <div className='row'>
                    <h4 className='mx-auto mt-5'>{this.state.dataProduct[0].name}</h4>
                </div>
                <div className='row'>
                    <h4 className='mx-auto'>Rp. {this.state.dataProduct[0].price}</h4>
                </div>
                <div className='row mt-3'>
                    <div className='card p-2 mx-auto'>
                        <img src={'https://upload-system-api.herokuapp.com/' + this.state.selectedProduct.image_url} 
                        style={{height:'400px', width:'400px'}}
                        alt=""/>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='mx-auto'>                     
                        <input onClick={()=>this.refs.editImage.click()} type="button" className='btn btn-primary mr-3' value={this.state.selectedImage === null ? 'edit Image' : this.state.selectedImage} style={{width:'100px'}}/>
                        <input onChange={this.onChangeInputImage} accept='image/*' type="file" ref='editImage' style={{display:"none"}}/>
                        {
                            this.state.selectedImage === null ?
                        <input onClick={()=>this.deleteBtn(this.state.dataProduct[0].image_id)} type="button" className='btn btn-danger' value='Delete' style={{width:'100px'}}/>
                        :
                        <span>
                            <input type="text" className='btn btn-primary' value='save'/>
                            <input onClick={()=>this.setState({selectedImage : null})} type="text" className='btn btn-danger' value='cancel'/>
                        </span>
                        }
                    </div>   
                </div>
                <div className='row mt-5 mb-5'>
                    {this.renderListImage()}
                </div>
            </div>
        )
    }
}
