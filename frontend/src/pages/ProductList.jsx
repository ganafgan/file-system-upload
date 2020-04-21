import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default class ProductList extends Component {

    state = {
        dataProduct : null
    }

    componentDidMount(){
        this.getAllProducts()
    }

    getAllProducts = () => {
        Axios.get('https://upload-system-api.herokuapp.com/product')
        .then((res)=>{
            console.log(res.dataProduct)
            let newData = []
            let sudahAda;
            res.data.data.forEach((val)=>{
                sudahAda = false
                for(var i =0 ; i < newData.length ; i++){
                    if(val.product_id === newData[i].product_id){
                        sudahAda = true
                        break;
                    }
                }
                if(!sudahAda)newData.push(val)
            })
            console.log(res.data.data)
            console.log(newData)
            this.setState({dataProduct : newData})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    printDataProduct = () => {
        return this.state.dataProduct.map((val)=>{
            return(
                <div className='col-md-4'>
                        <div className="card mb-3" style={{maxWidth: '540px'}}>
                            <div className="row no-gutters">
                                <div className="col-md-4 pr-5">
                                    <img src={`https://upload-system-api.herokuapp.com/${val.image_url}`}
                                    className=''
                                    style={{height:'150px',}}
                                    alt="..."/>
                                </div>
                                <div className="col-md-8 pl-5">
                                    <div className="card-body">
                                        <h5 className="card-title mx-auto">{val.name}</h5>
                                        <h5 className="card-title">Rp {val.price}</h5>
                                        <div className='row'>
                                            <Link to={'product-detail/' + val.product_id}>
                                                <div className='col-md-6'>
                                                    <input type="button" value='Detail' className='btn btn-success' style={{width:'100px'}}/>
                                                </div>
                                            </Link>
                                            <div className='col-md-6'>
                                                <input type="buttin" value='Delete' className='btn btn-danger' style={{width:'100px'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        })
    }
    render() {
        if(this.state.dataProduct === null) return <h1>Loading,.....</h1>
        if(this.state.dataProduct === 0) return <h1>Data masih kosong</h1>
        return (
            <div className='container-fluid'>
                <div className='row mt-5'>
                    <h3 className='mx-auto'>ProductList</h3>
                </div>
                <div className='row mt-5'>
                    {this.printDataProduct()}
                </div>
            </div>
        )
    }
}
