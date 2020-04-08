import React, { Component } from 'react'

export default class ProductDetail extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <h3 className='mx-auto mt-5'>Product Detail</h3>
                </div>
                <div className='row'>
                    <h4 className='mx-auto mt-5'>Anggur</h4>
                </div>
                <div className='row'>
                    <h4 className='mx-auto'>Rp 50.000</h4>
                </div>
                <div className='row mt-3'>
                    <div className='card p-2 mx-auto'>
                        <img src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2020/4/4/67078096/67078096_5de42609-f263-430b-9491-355bc7c83647_1024_1024.webp" 
                        style={{height:'300px', width:'300px'}}
                        alt=""/>
                    </div>
                </div>
                <div className='row mt-5 mb-5'>
                    <div className='col-md-3'>
                        <div className='card p-2' style={{maxWidth:'190px'}}>
                            <img src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2020/3/29/548740009/548740009_a2bd6d9d-c18b-4d58-bdb7-5ff91f662250_1080_1080.jpg.webp" alt=""
                            style={{height:'170px', width:'170px'}}
                            />
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card p-2' style={{maxWidth:'190px'}}>
                                <img src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2020/3/29/548740009/548740009_a2bd6d9d-c18b-4d58-bdb7-5ff91f662250_1080_1080.jpg.webp" alt=""
                                style={{height:'170px', width:'170px'}}
                                />
                            </div>
                        </div>
                    <div className='col-md-3'>
                        <div className='card p-2' style={{maxWidth:'190px'}}>
                            <img src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2020/3/29/548740009/548740009_a2bd6d9d-c18b-4d58-bdb7-5ff91f662250_1080_1080.jpg.webp" alt=""
                            style={{height:'170px', width:'170px'}}
                            />
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card p-2' style={{maxWidth:'190px'}}>
                            <img src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2020/3/29/548740009/548740009_a2bd6d9d-c18b-4d58-bdb7-5ff91f662250_1080_1080.jpg.webp" alt=""
                            style={{height:'170px', width:'170px'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
